import React, { useState, useEffect } from "react";
// import { Row, Col } from "react-bootstrap";
// import { FormSection, FormHead } from "../styles/index";
// import {
//   Button,
//   Cascader,
//   DatePicker,
//   Form,
//   Input,
//   InputNumber,
//   Select,
// } from "antd";
import apiRequest from "../apiRequest";
import { Link, useParams } from "react-router-dom";
// import { stringify } from "rc-field-form/es/useWatch";
import BusinessList from "./business/BusinessList";

const Business = () => {
  const [componentSize, setComponentSize] = useState("default");

  // const onFormLayoutChange = ({ size }) => {
  //   setComponentSize(size);
  // };
  const params = useParams();

  const [customersData, setcustomersData] = useState([]);

  useEffect(() => {
    apiRequest({
      method: "get",
      url: `/dashboard/get_cff_dashboard_data`,
    })
      .then((res) => {
        setcustomersData(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const datafiltered = customersData.filter(function (a) {
  //   return a.email == params.email;
  // });

  // const cv = datafiltered[0]?.business;
  // console.log(cv);

  // console.log(datafiltered);

  // const [datato, setdatato] = useState({
  //   business_first_name: cv?.business_first_name,
  //   // "business_m_i": datafiltered?.business.business_m_i,
  //   // "business_last_name": datafiltered?.business.business_last_name,
  //   // "datafiltered":datafiltered?.business.datafiltered,
  //   // "business_phone":datafiltered?.business.business_phone ,
  //   // "coverage_start":datafiltered?.business.coverage_start ,
  //   // "us_dot": datafiltered?.business.us_dot,
  //   // "us_dot_number":datafiltered?.business.us_dot_number ,
  //   // "years_in_business":datafiltered?.business.years_in_business ,
  //   // "years_in_business_2":datafiltered?.business.years_in_business_2 ,
  //   // "entity_type": datafiltered?.business.entity_type,
  //   // "business_name":datafiltered?.business.business_name ,
  //   // "business_DBA":datafiltered?.business.business_DBA ,
  //   // "business_DBA_name":datafiltered?.business.business_DBA_name ,
  //   // "describe_your_business":datafiltered?.business.describe_your_business ,
  //   // "business_located":datafiltered?.business.business_located,

  //   // "customer_first_name":datafiltered.customer_first_name ,
  //   // "customer_last_name":datafiltered.customer_last_name ,
  //   // "customer_m_i":datafiltered.customer_m_i ,
  //   // "customer_dob": datafiltered.customer_dob,
  //   // "customer_email": datafiltered.customer_email,
  //   // "customer_business_location":datafiltered.customer_business_location ,
  //   // "customer_street":datafiltered.customer_street ,
  //   // "customer_city": datafiltered.customer_city,
  //   // "customer_state":datafiltered.customer_state ,
  //   // "customer_zip":datafiltered.customer_zip ,
  //   // "transported_vehicle":datafiltered.transported_vehicle ,
  //   // "other": datafiltered.other,
  //   // "type_of_vehicle":datafiltered.type_of_vehicle,

  //   // "vehicle_number": datafiltered.vehicle_number,
  //   // "your_vehicle": datafiltered.your_vehicle,
  //   // "vehicle_year": datafiltered.vehicle_year,
  //   // "vehicle_maker": datafiltered.vehicle_maker,
  //   // "vehicle_model": datafiltered.vehicle_model,
  //   // "vehicle_not_use": datafiltered.vehicle_not_use,
  //   // "hour_of_service": datafiltered.hour_of_service,
  //   // "place_card": datafiltered.place_card,
  //   // "typically_travel": datafiltered.typically_travel,
  //   // "lease_vehicle": datafiltered.lease_vehicle,
  //   // "vehicle_value": datafiltered.vehicle_value,
  //   // "attach_equipment": datafiltered.attach_equipment,
  //   // "attach_equipment_p1": datafiltered.attach_equipment_p1,
  //   // "attach_equipment_p2": datafiltered.attach_equipment_p2,
  //   // "vehicles_on_quote": datafiltered.vehicles_on_quote,
  //   // "vehicles_on_quote_p2": datafiltered.vehicles_on_quote_p2,

  //   // "driver_first_name": datafiltered.driver_first_name,
  //   // "driver_m_i": datafiltered.driver_m_i,
  //   // "driver_last_name": datafiltered.driver_last_name,
  //   // "driver_dob": datafiltered.driver_dob,
  //   // "driver_licence": datafiltered.driver_licence,
  //   // "driver_state": datafiltered.driver_state,
  //   // "driver_last_year": datafiltered.driver_last_year,
  //   // "date_of_incident": datafiltered.date_of_incident,
  //   // "accident_violation": datafiltered.accident_violation,
  //   // "driver_doe_need": datafiltered.driver_doe_need,

  //   // "coverage_currently_ensure": datafiltered?.coverage_currently_ensure,
  //   // "coverage_continous_ins": datafiltered?.coverage_continous_ins,
  //   // "coverage_libility_limit": datafiltered?.coverage_libility_limit,
  //   // "coverage_exp_date": datafiltered?.coverage_exp_date,
  //   // "insurance_falling": datafiltered?.insurance_falling,
  //   // "last_five_year": datafiltered?.last_five_year,
  //   // "business_repossession": datafiltered?.business_repossession,
  //   // "coverages_below": datafiltered?.coverages_below,
  //   // "additional_insureds": datafiltered?.additional_insureds,
  //   // "subrogation_holders": datafiltered?.subrogation_holders,
  //   // "comprehensive": datafiltered?.comprehensive,
  //   // "collision": datafiltered?.collision,
  //   // "medical_payments": datafiltered?.medical_payments,
  //   // "rental_Reimbursement": datafiltered?.rental_Reimbursement,
  //   // "rental_with_downtime": datafiltered?.rental_with_downtime,
  //   // "roadside_assistance": datafiltered?.roadside_assistance,
  //   // "combined_additional": datafiltered?.combined_additional,
  //   // "liability": datafiltered?.liability,
  //   // "um_1": datafiltered?.um_1,
  //   // "um_2": datafiltered?.um_2,

  //   // "auto_libility": datafiltered?.auto_libility,
  //   // "truck_cargo": datafiltered?.truck_cargo,
  //   // "summary_interchange_1": datafiltered?.summary_interchange_1,
  //   // "summary_interchange_2": datafiltered?.summary_interchange_2,
  //   // "summary_interchange_3": datafiltered?.summary_interchange_3,
  //   // "physical_damage_1": datafiltered?.physical_damage_1,
  //   // "physical_damage_2": datafiltered?.physical_damage_2,
  //   // "gernal_libility": datafiltered?.gernal_libility,
  //   // "on_hook_1": datafiltered?.on_hook_1,
  //   // "on_hook_2": datafiltered?.on_hook_2,
  //   // "garage_keepers_1": datafiltered?.garage_keepers_1,
  //   // "garage_keepers_2": datafiltered?.garage_keepers_2
  // });

  // console.log(datato);
  // const handleChange = (e) => {
  //   setdatato((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  // const update = () => {
  //   apiRequest({
  //     method: `patch`,
  //     url: `/dashboard/cff_dashboard_data`,
  //     data: {
  //       business: {
  //         business_first_name: "weocweno",
  //         business_m_i: "1",
  //         business_last_name: "1111111111",
  //         business_email: "faizan@gmail.com",
  //         business_phone: "test",
  //         coverage_start: "testt",
  //         us_dot: "33433",
  //         us_dot_number: "test",
  //         years_in_business: "0",
  //         years_in_business_2: "test",
  //         entity_type: "test",
  //         business_name: "test",
  //         business_DBA: "test",
  //         business_DBA_name: "1",
  //         describe_your_business: "1",
  //         business_located: "2",
  //       },
  //       customer: {
  //         customer_first_name: "test",
  //         customer_last_name: "test",
  //         customer_m_i: "test",
  //         customer_dob: "2022-09-09",
  //         customer_email: "test@gmail.com",
  //         customer_business_location: "test",
  //         customer_street: "test",
  //         customer_city: "test",
  //         customer_state: "test",
  //         customer_zip: "1",
  //         transported_vehicle: "1",
  //         other: "2",
  //         type_of_vehicle: [1, 2, 22, 2],
  //       },
  //       vehicle: {
  //         vehicle_number: "123123",
  //         your_vehicle: "1",
  //         vehicle_year: "2022",
  //         vehicle_maker: "test",
  //         vehicle_model: "20220",
  //         vehicle_not_use: "2222",
  //         hour_of_service: "0",
  //         place_card: "test",
  //         typically_travel: "test",
  //         lease_vehicle: "test",
  //         vehicle_value: "1",
  //         attach_equipment: "test",
  //         attach_equipment_p1: "test",
  //         attach_equipment_p2: "1",
  //         vehicles_on_quote: "test",
  //         vehicles_on_quote_p2: "test",
  //       },
  //       driver: {
  //         driver_first_name: "test",
  //         driver_m_i: "1",
  //         driver_last_name: "test",
  //         driver_dob: "2020-09-09",
  //         driver_licence: "test",
  //         driver_state: "1",
  //         driver_last_year: "1",
  //         date_of_incident: "2022-09-09",
  //         accident_violation: "1",
  //         driver_doe_need: "1",
  //       },
  //       coverage: {
  //         coverage_currently_ensure: "1",
  //         coverage_continous_ins: "test",
  //         coverage_libility_limit: "1",
  //         coverage_exp_date: "2022-09-09",
  //         insurance_falling: "test",
  //         last_five_year: "1",
  //         business_repossession: "test",
  //         coverages_below: "test",
  //         additional_insureds: "1",
  //         subrogation_holders: "2020-09-09",
  //         comprehensive: "test",
  //         collision: "0",
  //         medical_payments: "test",
  //         rental_Reimbursement: "test",
  //         rental_with_downtime: "test",
  //         roadside_assistance: "test",
  //         combined_additional: "1",
  //         liability: "1",
  //         um_1: "2",
  //         um_2: "2020-09-09",
  //       },
  //       summary: {
  //         auto_libility: "1",
  //         truck_cargo: "1",
  //         summary_interchange_1: "1",
  //         summary_interchange_2: "1",
  //         summary_interchange_3: "1",
  //         physical_damage_1: "1",
  //         physical_damage_2: "1",
  //         gernal_libility: "1",
  //         on_hook_1: "1",
  //         on_hook_2: "1",
  //         garage_keepers_1: "1",
  //         garage_keepers_2: "1",
  //       },
  //     },
  //   })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <div className="Business">
      <BusinessList />
    </div>
  );
};

export default Business;
