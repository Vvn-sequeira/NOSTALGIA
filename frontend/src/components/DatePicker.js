import React from "react";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import "./Forms/DateTime.css";

function DatePicker(){
    let maxDate = new Date();
     return(
        <>
              <div className="icon-tweaks">
                <DateTimePickerComponent
                  placeholder="Please Select Date & Time"
                  max={maxDate}
                  format={"yyyy-MM-dd HH:mm"}
               
                />
              </div>
        </>
     )
}

export default DatePicker;