import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/app/lib/mongodb";
import Order from "@/app/lib/models/Order";
import Product from "@/app/lib/models/Product";

export async function POST(req: NextRequest) {
  let session: mongoose.ClientSession | null = null;

  try {
    // CONNECT DATABASE
    await connectDB();

    // READ REQUEST
    const { orderId, action, reason } = await req.json();

    // VALIDATE ORDER ID
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return NextResponse.json(
        { success: false, message: "Invalid order ID" },
        { status: 400 }
      );
    }

    // VALIDATE ACTION
    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json(
        { success: false, message: "Invalid action" },
        { status: 400 }
      );
    }

    // VALIDATE REJECTION REASON
    if (action === "reject" && !reason?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a rejection reason",
        },
        { status: 400 }
      );
    }

    // PENDING ORDER CONDITION
    const pendingCondition = {
      _id: orderId,
      $or: [
        { paymentStatus: "verification_pending" },
        {
          status: "pending_verification",
          paymentStatus: { $exists: false },
        },
        {
          status: "pending_verification",
          paymentStatus: null,
        },
      ],
    };

    // =====================================
    // APPROVE PAYMENT
    // =====================================

    if (action === "approve") {
      const now = new Date();

      const order = await Order.findOneAndUpdate(
        pendingCondition,
        {
          $set: {
            paymentStatus: "paid",
            status: "confirmed",
            paymentVerifiedAt: now,
            paymentVerifiedBy: "manual",
          },
          $push: {
            tracking: {
              $each: [
                {
                  status: "Payment Verified",
                  date: now,
                },
                {
                  status: "Order Confirmed",
                  date: now,
                },
              ],
            },
          },
        },
        { new: true }
      );

      if (!order) {
        return NextResponse.json(
          {
            success: false,
            message: "Order is not awaiting payment verification",
          },
          { status: 409 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Payment verified and order confirmed",
        order,
      });
    }

    // =====================================
    // REJECT PAYMENT
    // =====================================

    const activeSession = await mongoose.startSession();
    session = activeSession;

    let updatedOrder: any = null;

    await activeSession.withTransaction(async () => {
      const order = await Order.findOne(
        pendingCondition
      ).session(activeSession);

      if (!order) {
        throw new Error("ORDER_NOT_PENDING");
      }

      // RESTORE PRODUCT STOCK
      for (const item of order.items || []) {
        const productId = item._id;
        const quantity = Number(item.quantity || 1);

        // VALIDATE PRODUCT ID
        if (
          !productId ||
          !mongoose.Types.ObjectId.isValid(String(productId))
        ) {
          throw new Error("INVALID_PRODUCT_REFERENCE");
        }

        // VALIDATE QUANTITY
        if (!Number.isInteger(quantity) || quantity < 1) {
          throw new Error("INVALID_PRODUCT_QUANTITY");
        }

        // BUILD STOCK UPDATE
        const update: any = {
          $inc: {
            stock: quantity,
          },
        };

        // RESTORE SIZE STOCK
        if (item.size) {
          update.$inc[`sizeStock.${item.size}`] = quantity;
        }

        // UPDATE PRODUCT
        const product = await Product.findByIdAndUpdate(
          productId,
          update,
          {
            new: true,
            lean: true,
            includeResultMetadata: true
          }
        ).session(activeSession);

        if (!product) {
          throw new Error("PRODUCT_NOT_FOUND");
        }
      }

      // UPDATE ORDER STATUS
      const now = new Date();

      order.paymentStatus = "rejected";
      order.status = "payment_rejected";
      order.paymentRejectionReason = reason.trim();

      order.tracking = [
        ...(order.tracking || []),
        {
          status: "Payment Rejected",
          date: now,
        },
      ];

      await order.save({ session: activeSession });

      updatedOrder = order;
    });

    return NextResponse.json({
      success: true,
      message: "Payment rejected and stock restored",
      order: updatedOrder,
    });

  } catch (error: any) {
    console.error("PAYMENT VERIFICATION ERROR:", error);

    if (error.message === "ORDER_NOT_PENDING") {
      return NextResponse.json(
        {
          success: false,
          message: "Order is not awaiting payment verification",
        },
        { status: 409 }
      );
    }

    if (
      [
        "INVALID_PRODUCT_REFERENCE",
        "INVALID_PRODUCT_QUANTITY",
        "PRODUCT_NOT_FOUND",
      ].includes(error.message)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Could not safely restore product stock",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Payment verification failed",
      },
      { status: 500 }
    );

  } finally {
    if (session) {
      await session.endSession();
    }
  }
}