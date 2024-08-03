// app/payment-history/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Transaction {
    id: string;
    date: string;
    amount: number;
    method: string;
    description: string;
    status: string;
}

const dummyTransactions: Transaction[] = [
    {
        id: "1",
        date: "2024-08-01",
        amount: 49.99,
        method: "Credit Card",
        description: "Monthly Subscription",
        status: "Completed",
    },
    {
        id: "2",
        date: "2024-07-15",
        amount: 79.99,
        method: "PayPal",
        description: "Yearly Subscription",
        status: "Pending",
    },
    {
        id: "3",
        date: "2024-07-01",
        amount: 29.99,
        method: "Credit Card",
        description: "Monthly Subscription",
        status: "Completed",
    },
    // Add more dummy transactions as needed
];

export default function PaymentHistoryPage() {
    const { data: session, status } = useSession();
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        // Fetch transaction data from the backend
        // For this example, we're using dummy data
        setTransactions(dummyTransactions);
    }, []);

    if (status === "loading") {
        // Show loading state while session is being fetched
        return <p>Loading...</p>;
    }

    if (!session) {
        // Redirect or display a message if the user is not authenticated
        return <p>You need to be signed in to view this page.</p>;
    }

    return (
        <div>
            <motion.div
                className="bg-white shadow-md rounded-lg p-4 md:p-8 mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-xl md:text-2xl font-bold mb-4">
                    Payment History
                </h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-left text-gray-700">
                                    Date
                                </th>
                                <th className="py-2 px-4 border-b text-left text-gray-700">
                                    Amount
                                </th>
                                <th className="py-2 px-4 border-b text-left text-gray-700">
                                    Method
                                </th>
                                <th className="py-2 px-4 border-b text-left text-gray-700">
                                    Description
                                </th>
                                <th className="py-2 px-4 border-b text-left text-gray-700">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <motion.tr
                                    key={transaction.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="hover:bg-gray-100 transition-colors"
                                >
                                    <td className="py-2 px-4 border-b text-gray-600">
                                        {transaction.date}
                                    </td>
                                    <td className="py-2 px-4 border-b text-gray-600">
                                        ${transaction.amount.toFixed(2)}
                                    </td>
                                    <td className="py-2 px-4 border-b text-gray-600">
                                        {transaction.method}
                                    </td>
                                    <td className="py-2 px-4 border-b text-gray-600">
                                        {transaction.description}
                                    </td>
                                    <td
                                        className={`py-2 px-4 border-b ${transaction.status === "Completed"
                                                ? "text-green-600"
                                                : "text-yellow-600"
                                            }`}
                                    >
                                        {transaction.status}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
