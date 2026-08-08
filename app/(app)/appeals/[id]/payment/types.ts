export type CreateOrderResponse = {
    key: string;
    orderId: string;
    amount: number;
    currency: string;
};

export type RazorpaySuccessResponse = {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
};

export type RazorpayFailureResponse = {
    error: {
        code: string;
        description: string;
        source: string;
        step: string;
        reason: string;
        metadata: {
            order_id: string;
            payment_id: string;
        };
    };
};

export type VerifyPaymentRequest = {
    appealId: number;
    razorpayPaymentId: string;
    razorpayOrderId: string;
    razorpaySignature: string;
};

export type FailedPaymentRequest = {
    appealId: number;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpayErrorCode: string;
    razorpayErrorDescription: string;
};
