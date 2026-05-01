"use client";

import React from "react";

interface ReceiptProps {
  orderId: string;
  date: string;
  customerName?: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    service?: string;
    servicePrice?: number;
  }[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: 'cash' | 'card';
  cashReceived?: number;
  change?: number;
  operator: string;
}

export default function Receipt({
  orderId,
  date,
  customerName = "Walk-in Customer",
  items,
  subtotal,
  tax,
  total,
  paymentMethod,
  cashReceived,
  change,
  operator
}: ReceiptProps) {
  return (
    <div className="mx-auto w-[320px] bg-white p-6 font-mono text-[11px] leading-tight text-black">
      {/* Header */}
      <div className="mb-4 flex flex-col items-center text-center">
        <div className="text-xl font-bold tracking-tighter">LOMBOK</div>
        <div className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Sportswear</div>
        <div className="mt-2 text-[9px]">{date}</div>
      </div>

      {/* Token / Order ID */}
      <div className="mb-4 border-2 border-dashed border-gray-300 py-3 px-4 text-center">
        <div className="mb-1 text-[8px] font-bold uppercase tracking-widest">Token</div>
        <div className="text-[14px] font-bold tracking-widest">{orderId}</div>
      </div>

      {/* Details */}
      <div className="space-y-1 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-500 uppercase">Customer</span>
          <span className="font-bold">{customerName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 uppercase">Type</span>
          <span className="font-bold">Retail</span>
        </div>
      </div>

      {/* Items */}
      <div className="border-t border-dashed py-3 space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="space-y-0.5">
            <div className="flex justify-between font-bold">
              <span>{item.name} x{item.quantity}</span>
              <span>{(item.price * item.quantity).toLocaleString("id-ID")}</span>
            </div>
            {item.service && (
              <div className="flex justify-between text-[10px] text-gray-500 italic">
                <span>+ {item.service}</span>
                <span>{(item.servicePrice || 0).toLocaleString("id-ID")}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-dashed py-3 space-y-1">
        <div className="flex justify-between">
          <span className="text-gray-500 uppercase">Amount</span>
          <span className="font-bold">{subtotal.toLocaleString("id-ID")} IDR</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 uppercase">Tax (11%)</span>
          <span className="font-bold">{tax.toLocaleString("id-ID")} IDR</span>
        </div>
        <div className="flex justify-between text-sm font-bold pt-1 border-t border-black">
          <span className="uppercase">Total</span>
          <span className="font-black">{total.toLocaleString("id-ID")} IDR</span>
        </div>
      </div>

      {/* Payment Details */}
      <div className="border-t border-dashed py-3 space-y-1">
        <div className="flex justify-between">
          <span className="text-gray-500 uppercase">Payment</span>
          <span className="font-bold">{paymentMethod === 'cash' ? 'Cash (Tunai)' : 'Digital/Card'}</span>
        </div>
        {paymentMethod === 'cash' && cashReceived && (
          <>
            <div className="flex justify-between">
              <span className="text-gray-500 uppercase">Received</span>
              <span className="font-bold">{cashReceived.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 uppercase">Change</span>
              <span className="font-bold">{change?.toLocaleString("id-ID")}</span>
            </div>
          </>
        )}
      </div>

      {/* Operator */}
      <div className="border-t border-dashed py-3 flex justify-between mb-4">
        <span className="text-gray-500 uppercase">Operator</span>
        <span className="font-bold">{operator}</span>
      </div>

      {/* Footer Branding */}
      <div className="mt-8 flex flex-col items-center opacity-30">
        <div className="text-2xl font-black italic tracking-tighter">LOMBOK</div>
      </div>
    </div>
  );
}
