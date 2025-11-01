/**
 * CartSummary Component
 *
 * Displays order summary with subtotal, total, and checkout button.
 * In the future, this will include tax and shipping calculations.
 *
 * @component
 * @example
 * ```tsx
 * <CartSummary subtotal={25.97} />
 * ```
 */

interface CartSummaryProps {
  subtotal: number;
}

export function CartSummary({ subtotal }: CartSummaryProps) {
  // For now, total equals subtotal (no tax/shipping)
  const total = subtotal;

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

      {/* Subtotal */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">Subtotal</p>
        <p className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</p>
      </div>

      {/* Total */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
        <p className="text-base font-medium text-gray-900">Total</p>
        <p className="text-base font-medium text-gray-900">${total.toFixed(2)}</p>
      </div>

      {/* Checkout Button */}
      <button
        disabled={subtotal === 0}
        className="mt-6 w-full rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:bg-gray-400"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
