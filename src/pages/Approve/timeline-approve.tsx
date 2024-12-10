import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Clock1,
  InfoIcon,
  SchoolIcon,
  StarIcon,
  WorkflowIcon,
} from "lucide-react";
import moment from "moment";
import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { TimelineDataApproval } from "./dialog-detail-request";

interface TimelineApproveProps {
  data: TimelineDataApproval[];
}

const TimelineApprove: React.FC<TimelineApproveProps> = ({ data }) => {
  const baseImageUrl = import.meta.env.VITE_BASE_USERIMG_URL;

  return (
    <div className="bg-slate-50 rounded-[12px]">
      <VerticalTimeline>
        {data?.map((item) => (
          <VerticalTimelineElement
            className="vertical-timeline-element--work relative"
            date="2024-12-11"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            icon={<WorkflowIcon size={14} />}
          >
            <div className="flex justify-start gap-x-4 relative">
            <div className="absolute z-1 w-[40px] h-[40px] bg-blue-200 top-[15px] left-0 rounded-l-[5px]"></div>

              {/* Profile Image */}
              <div className="ml-[1rem] border-[0.2rem] border-blue-50 relative z-2 flex justify-center items-center object-cover w-[80px] h-[80px] overflow-hidden rounded-full bg-red-50">
                <img
                  src={`${baseImageUrl}/${item.empCode}`}
                  className="w-full h-auto"
                  alt="profile"
                />
              </div>
              <div>
                <p className="vertical-timeline-element-title">{item.name}</p>
                <p className="vertical-timeline-element-subtitle">
                  {item.position}
                </p>
                <div className="bg-[#FED0D0] rounded-[8px] text-[#A30014] w-[60px] text-[11px] flex justify-center items-center">
                  {item.status}
                </div>
              </div>
            </div>
            <div className="mt-[0.8rem]">
              <div className="text-[12px] vertical-timeline-element-subtitle flex items-center gap-x-2">
                ความคิดเห็น <InfoIcon className="text-gray-500" size={12} /> :
              </div>
              <div className="h-[80px] p-2 overflow-auto mt-1">
                <p className="text-[12px] vertical-timeline-element-subtitle"></p>
                <Textarea
                  value={item.comment}
                  className="vertical-timeline-element-comment border-none w-full"
                />
              </div>
              <div className="flex items-center text-gray-500 gap-x-2">
                <Clock1 size={12} />
                <p className="text-[12px] vertical-timeline-element-subtitle ">
                  ล่าสุดเมื่อ :
                </p>

                <p className="text-[12px] vertical-timeline-element-subtitle flex gap-x-2">
                  {moment(item.lastUpdate).format("YYYY-MM-DD HH:mm")}
                </p>
              </div>
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default TimelineApprove;
