export default function PaymentCanceled() {
    return (
        <div className="min-h-screen bg-gradient-to-b   from-black to-gray-900 flex items-center justify-center">
            <div className="text-center p-8 border-2  border-red-600 rounded-lg shadow-lg">
                <h1 className="text-6xl font-extrabold text-red-600 mb-6 animate-bounce">
                    Payment Canceled
                </h1>
                <p className="text-lg text-red-400 mb-4">
                    Your booking payment was not completed.
                </p>
                <p className="text-md text-gray-300">
                    If this was a mistake, you can try again or contact us for assistance.
                </p>
                <div className="mt-8 flex justify-center gap-4">

                    <a
                        href="/"
                        className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-full shadow-md hover:bg-gray-700 transition-transform transform hover:scale-105"
                    >
                        Book Again
                    </a>
                </div>
            </div>
        </div>
    );
}
