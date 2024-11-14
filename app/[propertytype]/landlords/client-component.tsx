"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Mail,
  FileText,
  Trash2,
  Edit2,
  Eye,
  ArrowUpDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { format } from "date-fns";
import {
  ClientComponentProps,
  LandlordData,
  SortField,
  SortOrder,
  StatusFilter,
} from "./_types/landlords";

const Landlords: React.FC<ClientComponentProps> = ({
  refreshData,
  initialData,
}) => {
  const [landlords, setLandlords] = useState<LandlordData[]>(initialData);
  const [sortBy, setSortBy] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [filter, setFilter] = useState<StatusFilter>("active");
  const router = useRouter();

  const handleSort = async (newSortBy: SortField) => {
    const newOrder = newSortBy === sortBy ? sortOrder : "asc";

    setSortBy(newSortBy);
    setSortOrder(newOrder);

    try {
      const newData = await refreshData({
        initial_sort_by: newSortBy,
        initial_order: newOrder,
        initial_filter: filter,
      });
      setLandlords(newData);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  const handleSortOrderToggle = async () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    try {
      const newData = await refreshData({
        initial_sort_by: sortBy,
        initial_order: newOrder,
        initial_filter: filter,
      });
      setLandlords(newData);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  const handleFilterChange = async (newFilter: StatusFilter) => {
    setFilter(newFilter);
    try {
      const newData = await refreshData({
        initial_sort_by: sortBy,
        initial_order: sortOrder,
        initial_filter: newFilter,
      });
      setLandlords(newData);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  const handleAddLandlord = () => {
    router.push("/lettings/landlords/register");
  };

  return (
    <div className="container mx-auto p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Landlords</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Landlords</h1>
            <Button
              onClick={handleAddLandlord}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Landlord
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4 items-center mb-4">
              <div className="flex items-center gap-2">
                <span>Sort By:</span>
                <Select
                  onValueChange={(value: SortField) => handleSort(value)}
                  name="sortBy"
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Choose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Options</SelectLabel>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="created_at">
                        Date Registered
                      </SelectItem>
                      <SelectItem value="phone_nr">Phone Number</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSortOrderToggle}
                  className="flex items-center gap-2"
                >
                  <ArrowUpDown className="w-4 h-4" />
                  {sortOrder === "asc" ? "Ascending" : "Descending"}
                </Button>
              </div>

              <div className="flex gap-2 ml-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>

            {landlords.map((landlord: LandlordData) => (
              <Card key={landlord.landlord_id}>
                <CardContent className="p-6">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold text-lg">
                        {landlord.full_name || landlord.company_name || "N/A"}
                      </h3>
                      <div className="text-sm text-gray-500 mt-1">
                        <p>{landlord.phone_nr}</p>
                        <p>e: {landlord.email}</p>
                      </div>
                      <p className="text-sm mt-2">
                        Date registered:{" "}
                        {landlord.created_at
                          ? format(new Date(landlord.created_at), "dd/MM/yyyy")
                          : "N/A"}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          landlord.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        } inline-block text-center`}
                      >
                        {landlord.status}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="p-2 flex items-center"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="p-2 flex items-center"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="w-full lg:w-80">
          <CardHeader>
            <CardTitle>Search Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                onValueChange={(value: StatusFilter) =>
                  handleFilterChange(value)
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Choose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Landlords;
