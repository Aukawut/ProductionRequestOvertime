import { Textarea } from "@/components/ui/textarea";
import { Clock1, InfoIcon } from "lucide-react";

import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { TimelineDataApproval } from "./dialog-detail-request";
import UsersLogo from "@/assets/images/user.png";
import BadgeMini from "@/components/custom/BadgeMini/BadgeMini";

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
            date={item.date}
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            icon={<item.icon />}
          >
            <div className="flex justify-start gap-x-4 relative">
              <div className="absolute z-1 w-[40px] h-[40px] bg-blue-200 top-[15px] left-0 rounded-l-[5px]"></div>

              {/* Profile Image */}
              <div className="ml-[1rem] border-[0.2rem] border-blue-50 relative z-2 flex justify-center items-center object-cover w-[80px] h-[80px] overflow-hidden rounded-full bg-red-50">
                <img
                  src={
                    item.empCode ? `${baseImageUrl}/${item.empCode}` : UsersLogo
                  }
                  className="w-full h-auto"
                  alt="profile"
                />
              </div>

              <div>
                <p className="vertical-timeline-element-title">{item.name}</p>
                <p className="vertical-timeline-element-subtitle">
                  {item.position}
                </p>
                {item.status == "Pending" ? (
                  <BadgeMini
                    variant="Pending"
                    text={item.status}
                    width={60}
                    height={20}
                  />
                ) : item.status == "Reject" ? (
                  <BadgeMini
                    variant="Reject"
                    text={item.status}
                    width={60}
                    height={20}
                  />
                ) : item.status == "Done" ? (
                  <BadgeMini
                    variant="Done"
                    text={item.status}
                    width={60}
                    height={20}
                  />
                ) : item.status == "Not Approve" ? (
                  <BadgeMini
                    variant="Not Approve"
                    text={item.status}
                    width={80}
                    height={20}
                  />
                ) : "-"}
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
                  {item.lastUpdate}
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
