import React,{useState} from 'react'
import ProgramForm from "../components/ProgramForm"


const ProgramFormPage = () => {
  
  const [formData, setFormData] = useState({
  title: "",
  companyName: "",
  description: "",
  scope: "",
  rewardRange: "",
  maxReward: "",
  status: "ACTIVE",
  programType: "Public",
  tags: [],
  createdBy: "",
  contactEmail: "",
  policyUrl: "",
  disclosurePolicy: "",
  image: "",
  expiryDate: "",
  });
  return (
    <div>
      <ProgramForm formData={formData} setFormData={setFormData}/>
    </div>
  )
}

export default ProgramFormPage;
