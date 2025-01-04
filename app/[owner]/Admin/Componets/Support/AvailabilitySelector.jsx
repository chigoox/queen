import { Button, Card, CardBody, CardHeader, Input, TimeInput } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CollapsibleSection } from "@/app/General/CollapsibleSection";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const AvailabilitySelector = ({ setData }) => {
  const [availability, setAvailability] = useState({});

  useEffect(() => {
    setData((old) => ({ ...old, availability }));
  }, [availability]);

  const handleTimeChange = (day, type, value) => {
    console.log('Vale',value)
    setAvailability((prev) => ({
      ...prev, 
      [day]: {
        ...prev[day],
        [type]: value,
      },
    }));
  };


  return (
    <div className="mx-auto my-5 max-w-4xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CollapsibleSection title="Set Your Availability">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {daysOfWeek.map((day) => (
              <Card key={day} className="w-full">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardHeader className="font-bold">{day}</CardHeader>
                  <CardBody>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col grid-cols-2 gap-2">
                        <TimeInput
                        granularity="hour"
                          type="time"
                          className="w-full"
                          placeholder="Start Time"
                          aria-label="Start Time"
                          onChange={(e) => {console.log(e.hour);handleTimeChange(day, "startTime", e.hour)}}
                        />
                      </div>
                      
                      <div>
                        <TimeInput
                        granularity="hour"
                          type="time"
                          className="w-full"
                          placeholder="End Time"
                          aria-label="End Time"
                          onChange={(e) => {console.log(e.hour);handleTimeChange(day, "endTime", e.hour)}}
                        />
                      </div>
                     
                    </div>
                  </CardBody>
                </motion.div>
              </Card>
            ))}
          </div>
        </CollapsibleSection>
      </motion.div>
    </div>
  );
};

export default AvailabilitySelector;