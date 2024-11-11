import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ViewingData } from "../../_types/form";

type StaffMember = {
  user_id: string;
  name: string;
};

type ViewingProps = {
  formData: ViewingData;
  onFormDataChange: (data: Partial<Omit<ViewingData, "eventType">>) => void;
};

const Viewing: React.FC<ViewingProps> = ({ formData, onFormDataChange }) => {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStaffMembers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const apiHost = process.env.NEXT_PUBLIC_API_HOST;
        const response = await fetch(`${apiHost}/api/v1/users/staff`);
        if (!response.ok) {
          throw new Error("Failed to fetch staff members");
        }
        const data = await response.json();
        setStaffMembers(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch staff members"
        );
        console.error("Error fetching staff members:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStaffMembers();
  }, []);

  const handleChange = (field: keyof ViewingData, value: any) => {
    onFormDataChange({ [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Property</Label>
        <Input
          type="text"
          placeholder="Search property..."
          value={formData.property}
          onChange={(e) => handleChange("property", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Staff</Label>
        <Select
          value={formData.staff?.[0]}
          onValueChange={(value) => handleChange("staff", [value])}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={isLoading ? "Loading..." : "Select staff member"}
            />
          </SelectTrigger>
          <SelectContent>
            {error && (
              <SelectItem value="error" disabled>
                Error loading staff members
              </SelectItem>
            )}
            {staffMembers.map((staff) => (
              <SelectItem key={staff.user_id} value={staff.user_id}>
                {staff.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Viewing Status</Label>
        <Select
          value={formData.viewingStatus}
          onValueChange={(value) => handleChange("viewingStatus", value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Scheduled">Scheduled</SelectItem>
            <SelectItem value="Confirmed">Confirmed</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Switch
            checked={formData.isSecondViewing}
            onCheckedChange={(checked) =>
              handleChange("isSecondViewing", checked)
            }
          />
          <Label>Second Viewing</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={formData.isVirtualViewing}
            onCheckedChange={(checked) =>
              handleChange("isVirtualViewing", checked)
            }
          />
          <Label>Virtual Viewing</Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Arrangements</Label>
        <Textarea
          placeholder="Enter viewing arrangements..."
          value={formData.arrangements}
          onChange={(e) => handleChange("arrangements", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Feedback</Label>
        <Textarea
          placeholder="Enter feedback..."
          value={formData.feedback}
          onChange={(e) => handleChange("feedback", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Internal Notes</Label>
        <Textarea
          placeholder="Enter internal notes..."
          value={formData.internalNotes}
          onChange={(e) => handleChange("internalNotes", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Follow-up Date</Label>
        <Input
          type="date"
          value={formData.followUpDate || ""}
          onChange={(e) => handleChange("followUpDate", e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Switch
            checked={formData.isClosed}
            onCheckedChange={(checked) => handleChange("isClosed", checked)}
          />
          <Label>Is Closed</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={formData.sendNotification}
            onCheckedChange={(checked) =>
              handleChange("sendNotification", checked)
            }
          />
          <Label>Send Notification</Label>
        </div>
      </div>
    </div>
  );
};

export default Viewing;
