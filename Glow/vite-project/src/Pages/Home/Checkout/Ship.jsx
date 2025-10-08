import { Field } from 'formik'
import React from 'react'

export default function Ship() {
  return (
    <>
  <Field
               component="select"
               id="location"
               name="location"
               placeholder='country-regions'
               className=" mb-3 p-2 w-100  border-[.5px] rounded-lg placeholder:text-mured border-[#DEDEDE] "
             >
               <option  value="NY">New York</option>
               <option value="SF">San Francisco</option>
               <option value="CH">Chicago</option>
               <option value="OTHER">Other</option>
             </Field>
             <div className="flex gap-2 mb-2">
              <Field 
              name ="firstname"
              type='"text'
              placeholder="first name (optional)"
              className="placeholder:capitalize  border-[.5px] rounded-lg placeholder:text-muted border-[#DEDEDE]  p-2 w-49"
              
              >
  
              </Field>
              <Field 
              name ="lastname"
              type='"text'
              placeholder="last name"
              className="placeholder:capitalize p-2 w-49  rounded-lg border-[.5px] placeholder:text-muted border-[#DEDEDE] "
              required
              
              >
  
              </Field>
              </div>
              <div className="flex gap-2 mb-2">


              
                <Field 
              name ="Address"
              type='"text'
              placeholder="address"
              className="placeholder:capitalize p-2 w-49 rounded-lg  border-[.5px] placeholder:text-muted border-[#DEDEDE] "
              required
              
              >
  
              </Field>
              <Field 
              name ="apartment"
              type='text'
              placeholder="apartment ,suite,etc (optional)"
              className="placeholder:capitalize p-2 w-49  rounded-lg border-[.5px] placeholder:text-muted border-[#DEDEDE] "
              
              >
                
              </Field>
              </div>
              <div className="flex gap-2 mb-2">
              <Field 
              name ="city"
              type='"text'
              placeholder="city"
              className="placeholder:capitalize  border-[.5px] rounded-lg placeholder:text-muted border-[#DEDEDE]  p-2 w-49"
              
              >
  
              </Field>
              <Field 
              name ="postal code"
              type='number'
              placeholder="postal code"
              className="placeholder:capitalize p-2 w-49 rounded-lg border-[.5px] placeholder:text-muted border-[#DEDEDE] "
              required
              
              >
  
              </Field>
  
              </div>
              <label className="flex items-center gap-2">
                  <Field type="checkbox" className="border-[.5px]  placeholder:text-[#DEDEDE] border-[#DEDEDE]" name="checked" />
                  <span>save this informations</span>
                </label>
                <div className="my-4">
  <h3 className="font-semibold capitalize"> shipping method </h3>
                
                <div className=" flex justify-between p-2 rounded-lg mt-3 bg-[#F5F6FF] border-1 border-blue-700 ">
                  <p>Standerd</p>
                  <p>FREE</p>
  
                </div>
              </div>
             </>
              
              
  )
}
