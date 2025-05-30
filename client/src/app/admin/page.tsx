"use client";

import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { StatusChangeDialog } from "./components";
import { Checkbox } from "@/components/ui/checkbox";
import StatusSelect from "./components/SelectStatus";
import FoodListPopover from "./components/FoodListPopover";
import { DatePickerWithRange } from "@/components/ui/date-with-rangepicker";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type OrderStatus = "pending" | "delivered" | "canceled";

export type Food = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
};

type User = {
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  ttl: Date;
  isVerified: boolean;
};

export type FoodOrderItems = {
  food: Food;
  quantity: number;
};

type Order = {
  _id: string;
  createdAt: Date;
  totalPrice: number;
  status: OrderStatus;
  foodOrderItems: FoodOrderItems[];
  user: User;
};

type AllOrder = {
  order: Order[];
};

export const AdminOrderDashboard = () => {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [statusEditOpen, setStatusEditOpen] = useState(false);
  const [statusChange, setStatusChange] = useState<OrderStatus | "">("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date("2025-05-01"),
    to: new Date("2025-05-31"),
  });

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get<AllOrder>(
          "http://localhost:8000/food-order"
        );
        setOrders(res.data?.order);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    };
    getOrders();
  }, []);

  const handleSelect = (id: string, checked: boolean) => {
    setSelectedOrders((prev) =>
      checked ? [...prev, id] : prev.filter((orderId) => orderId !== id)
    );
  };

  const handleStatusChange = (id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order._id === id ? { ...order, status } : order))
    );
  };

  const filteredOrders = (orders ?? []).filter((order) => {
    if (!dateRange?.from || !dateRange?.to) return true;
    const orderDate = new Date(order.createdAt);
    console.log(order);
    return orderDate >= dateRange.from && orderDate <= dateRange.to;
  });

  return (
    <div className="p-6 space-y-4 border border-[#E4E4E7] bg-white rounded-lg w-full ">
      <div className="flex justify-between ">
        <div>
          <h2 className="text-xl font-semibold">Orders</h2>
          <p className="text-sm text-gray-500"> items</p>
        </div>
        <div className="flex gap-3">
          <DatePickerWithRange value={dateRange} onChange={setDateRange} />

          <StatusChangeDialog
            open={statusEditOpen}
            onOpenChange={setStatusEditOpen}
            selected={selectedOrders}
            onSave={() => {
              setOrders((prev) =>
                prev.map((order) =>
                  selectedOrders.includes(order._id)
                    ? { ...order, status: statusChange as OrderStatus }
                    : order
                )
              );
              setSelectedOrders([]);
              setStatusEditOpen(false);
              setStatusChange("");
            }}
            statusChange={statusChange}
            setStatusChange={setStatusChange}
          />

          <Button
            className="border rounded-full "
            disabled={selectedOrders.length === 0}
            onClick={() => setStatusEditOpen((prev) => !prev)}
          >
            Change delivery state
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                className="border border-black"
                checked={
                  orders &&
                  orders.length > 0 &&
                  selectedOrders.length === orders.length
                }
                onCheckedChange={(checked) =>
                  setSelectedOrders(
                    checked ? (orders ?? []).map((order) => order._id) : []
                  )
                }
              />
            </TableHead>
            <TableHead>#</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Foods</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order, index) => (
            <TableRow key={order._id}>
              <TableCell>
                <Checkbox
                  className="border border-black"
                  checked={selectedOrders.includes(order._id)}
                  onCheckedChange={(checked) =>
                    handleSelect(order._id, !!checked)
                  }
                />
              </TableCell>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{order.user?.email}</TableCell>
              <TableCell>
                <FoodListPopover foodOrderItems={order.foodOrderItems} />
              </TableCell>
              <TableCell>
                {format(new Date(order.createdAt), "yyyy-MM-dd")}
              </TableCell>
              <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
              <TableCell>{order.user?.address}</TableCell>
              <TableCell>
                <StatusSelect
                  onChange={(newStatus) =>
                    handleStatusChange(order._id, newStatus)
                  }
                  value={order.status}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminOrderDashboard;
