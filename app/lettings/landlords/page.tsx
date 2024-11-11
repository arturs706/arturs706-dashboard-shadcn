import React, { useState } from 'react';
import { Search, Plus, Mail, FileText, Trash2, Edit2, Eye } from 'lucide-react';
import { CustomModal } from '@/components/elements/custom-dialog/custom-dialog';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";

const LandlordPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('fullname');
  const [landlords, setLandlords] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john@example.com',
      phone: '+44 123 456 7890',
      mobile: '+44 987 654 3210',
      status: 'Active',
      dateRegistered: '2024-11-01'
    }
    // Add more sample data as needed
  ]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Landlords</h1>
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus size={16} />
              Add Landlord
            </Button>
          </div>

          {/* Landlord List */}
          <div className="space-y-4">
            {/* Sort Controls */}
            <div className="flex gap-4 items-center mb-4">
              <span>Sort By:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fullname">Full Name</SelectItem>
                  <SelectItem value="firstname">First Name</SelectItem>
                  <SelectItem value="surname">Surname</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="dateRegistered">Date Registered</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2 ml-auto">
                <Button variant="outline" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>

            {/* Landlord Cards */}
            {landlords.map((landlord) => (
              <Card key={landlord.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{landlord.name}</h3>
                      <div className="text-sm text-gray-500 mt-1">
                        <p>{landlord.phone}</p>
                        <p>e: {landlord.email}</p>
                        {landlord.mobile && <p>m: {landlord.mobile}</p>}
                      </div>
                      <p className="text-sm mt-2">
                        Date registered: {new Date(landlord.dateRegistered).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="px-2 py-1 rounded-full text-sm bg-green-100 text-green-800 inline-block text-center">
                        {landlord.status}
                      </span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
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

        {/* Search Sidebar */}
        <Card className="w-full lg:w-80">
          <CardHeader>
            <CardTitle>Search Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select defaultValue="active">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Property Category</Label>
              <Select defaultValue="residential">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Branch</Label>
              <Select defaultValue="head">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="head">Head Office</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Address</Label>
              <Input placeholder="Search address" />
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Input placeholder="Search notes" />
            </div>

            <div className="space-y-2">
              <Label>Date Registered</Label>
              <div className="flex gap-2">
                <DatePicker />
                <DatePicker />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Do Not Delete Before</Label>
              <div className="flex gap-2">
                <DatePicker />
                <DatePicker />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="overseas" />
              <Label htmlFor="overseas">Overseas</Label>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Register Landlord Modal */}
      <RegisterLandlordModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
};