import React, { useState, useEffect } from "react";
import { IIncoming } from "@models/incoming.model";
import { IProduct } from "@models/product.model";
import { useAuth } from "@hooks/useAuth";
import {
  FaChartBar,
  FaClock,
  FaDollarSign,
  FaCube,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";

interface InsightStats {
  totalIncomingRequests: number;
  pendingRequests: number;
  quotedRequests: number;
  totalProducts: number;
  soldProducts: number;
  featuredProducts: number;
}

const AdminInsights: React.FC = () => {
  const [stats, setStats] = useState<InsightStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { authFetch } = useAuth();

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const [incomingResponse, productsResponse] = await Promise.all([
          authFetch("/api/incoming?limit=1000"),
          authFetch("/api/products?limit=1000"),
        ]);

        if (!incomingResponse.ok || !productsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const incomingData = await incomingResponse.json();
        const productsData = await productsResponse.json();

        const incomingRequests: IIncoming[] = incomingData.requests;
        const products: IProduct[] = productsData.products;

        const newStats: InsightStats = {
          totalIncomingRequests: incomingRequests.length,
          pendingRequests: incomingRequests.filter(
            (r) => r.status === "Pending",
          ).length,
          quotedRequests: incomingRequests.filter((r) => r.status === "Quoted")
            .length,
          totalProducts: products.length,
          soldProducts: products.filter((p) => p.sold).length,
          featuredProducts: products.filter((p) => p.featured).length,
        };

        setStats(newStats);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching insights:", err);
        setError("Failed to load insights. Please try again later.");
        setLoading(false);
      }
    };

    fetchInsights();
  }, [authFetch]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!stats) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InsightCard
          title="Total Incoming Requests"
          value={stats.totalIncomingRequests}
          icon={FaChartBar}
          color="bg-blue-100 text-blue-800"
        />
        <InsightCard
          title="Pending Requests"
          value={stats.pendingRequests}
          icon={FaClock}
          color="bg-yellow-100 text-yellow-800"
        />
        <InsightCard
          title="Quoted Requests"
          value={stats.quotedRequests}
          icon={FaDollarSign}
          color="bg-green-100 text-green-800"
        />
        <InsightCard
          title="Total Products"
          value={stats.totalProducts}
          icon={FaCube}
          color="bg-purple-100 text-purple-800"
        />
        <InsightCard
          title="Sold Products"
          value={stats.soldProducts}
          icon={FaShoppingCart}
          color="bg-pink-100 text-pink-800"
        />
        <InsightCard
          title="Featured Products"
          value={stats.featuredProducts}
          icon={FaStar}
          color="bg-orange-100 text-orange-800"
        />
      </div>
    </div>
  );
};

interface InsightCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<React.SVGAttributes<SVGElement>>;
  color: string;
}

const InsightCard: React.FC<InsightCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
}) => (
  <div className={`rounded-lg shadow-md overflow-hidden ${color}`}>
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium truncate">{title}</dt>
            <dd>
              <div className="text-lg font-medium">
                {value.toLocaleString()}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
);

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div
    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
    role="alert"
  >
    <strong className="font-bold">Error: </strong>
    <span className="block sm:inline">{message}</span>
  </div>
);

export default AdminInsights;

// path: src/containers/Admin/AdminInsights.tsx
