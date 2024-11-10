import { Card } from "@/components/ui/card";
import MonthCalendar from "./MonthCalendar";
import ColorPicker from "./ColorPicker";
import { SidebarProps } from "../_types/sidebarTypes";
  
const Sidebar = ({
    currentDate,
    monthViewDate,
    setMonthViewDate,
    onDateSelect,
    userSettings,
    onColorChange,
    data,
  }: SidebarProps) => {
    const handleColorChange = async (color: string) => {
    onColorChange(color); 
  };
    return (
      <div className="flex flex-col gap-4">
        <MonthCalendar
          currentDate={currentDate}
          monthViewDate={monthViewDate}
          setMonthViewDate={setMonthViewDate}
          onDateSelect={onDateSelect}
        />
        <Card className="p-4 w-64">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-medium">{userSettings.username}</span>
            <ColorPicker
            currentColor={userSettings.eventColor}
            onColorChange={handleColorChange} // Use async function
            defaultColor={data.diary_colour}
          />
          </div>
        </Card>
      </div>
    );
  };

export default Sidebar;