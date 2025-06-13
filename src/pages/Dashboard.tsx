import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Users, TrendingUp } from "lucide-react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useAuth } from "@/context/AuthContext";

Chart.register(...registerables);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const pieChartData = {
    labels: ["Completed", "Abandoned"],
    datasets: [
      {
        data: [stats ? 100 - 0 : 0, 0],
        backgroundColor: ["rgba(212, 175, 55, 0.7)", "rgba(0, 0, 0, 0.1)"],
        borderColor: ["rgba(212, 175, 55, 1)", "rgba(0, 0, 0, 0.2)"],
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue border-t-transparent"></div>
          <p className="text-lg text-muted-foreground">
            Loading dashboard data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Responses
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">fgxd</div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Completion Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">564%</div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">fg</div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">dfg</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Completion Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="h-[250px] w-[250px]">
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Dashboard;
