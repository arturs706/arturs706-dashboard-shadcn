import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Clock } from "lucide-react";
import { useMemo, useEffect, useRef } from "react";

interface TimePickerProps {
  label: string;
  value: string;
  onChange: (time: string) => void;
  id?: string;
  name?: string;
  ariaLabel?: string;
}

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  label,
  id,
  name,
  ariaLabel
}) => {
  const hours = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
  const minutes = useMemo(() => Array.from({ length: 12 }, (_, i) => i * 5), []);
  const hourRef = useRef<HTMLButtonElement>(null);
  const minuteRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!value) {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = Math.floor(now.getMinutes() / 5) * 5;
      const defaultTime = formatTime(currentHour, currentMinute);
      onChange(defaultTime);
    }
  }, [value, onChange]);

  const [selectedHour, selectedMinute] = (value || '00:00').split(':').map(Number);

  const formatTime = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  const handlePopoverOpen = () => {
    setTimeout(() => {
      if (hourRef.current) {
        hourRef.current.scrollIntoView({ block: 'center', behavior: 'auto' });
      }
      if (minuteRef.current) {
        minuteRef.current.scrollIntoView({ block: 'center', behavior: 'auto' });
      }
    }, 0);
  };

  const timePickerId = id || name || `time-picker-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const labelId = `${timePickerId}-label`;
  const hoursId = `${timePickerId}-hours`;
  const minutesId = `${timePickerId}-minutes`;

  return (
    <div className="relative">
      <label 
        className="block text-sm font-medium text-gray-700 mb-1"
        id={labelId}
        htmlFor={timePickerId}
      >
        {label}
      </label>
      <Popover onOpenChange={(open) => open && handlePopoverOpen()}>
        <PopoverTrigger asChild>
          <button
            type="button"
            id={timePickerId}
            name={name}
            aria-label={ariaLabel || `Select ${label}`}
            aria-labelledby={labelId}
            aria-haspopup="dialog"
            className="w-full flex items-center justify-between px-3 py-2 border rounded-md bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <span>{value || '00:00'}</span>
            <Clock className="h-4 w-4 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-0" align="start">
          <div className="grid grid-cols-2 gap-2 p-2">
            <div className="space-y-2" role="listbox" aria-labelledby={hoursId}>
              <div id={hoursId} className="text-xs font-medium text-gray-500 mb-2">Hours</div>
              <div className="space-y-1 max-h-[200px] overflow-y-auto scrollbar-hide">
                {hours.map((hour) => (
                  <button
                    key={hour}
                    ref={hour === selectedHour ? hourRef : null}
                    onClick={() => onChange(formatTime(hour, selectedMinute))}
                    role="option"
                    aria-selected={hour === selectedHour}
                    className={`w-full text-left px-2 py-1 text-sm rounded-md ${
                      hour === selectedHour ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'
                    }`}
                  >
                    {hour.toString().padStart(2, '0')}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2" role="listbox" aria-labelledby={minutesId}>
              <div id={minutesId} className="text-xs font-medium text-gray-500 mb-2">Minutes</div>
              <div className="space-y-1 max-h-[200px] overflow-y-auto scrollbar-hide">
                {minutes.map((minute) => (
                  <button
                    key={minute}
                    ref={minute === selectedMinute ? minuteRef : null}
                    onClick={() => onChange(formatTime(selectedHour, minute))}
                    role="option"
                    aria-selected={minute === selectedMinute}
                    className={`w-full text-left px-2 py-1 text-sm rounded-md ${
                      minute === selectedMinute ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'
                    }`}
                  >
                    {minute.toString().padStart(2, '0')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default TimePicker;