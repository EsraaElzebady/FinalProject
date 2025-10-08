import React from 'react'
import FAQItem from '../FAQItem/FAQItem'

export default function DiscountQuestions() {
    const discountQuestions =[{
        question: "How did my package ship?",
        answer: "Complexion-perfecting natural foundation enriched with antioxidant-packed superfruits, vitamins, and other skin-nourishing nutrients. Creamy liquid formula sets with a pristine matte finish for soft, velvety smooth skin.",
        greet:"Say hello to flawless, long-lasting foundation that comes in 7 melt-into-your-skin shades. This lightweight, innovative formula creates a smooth, natural matte finish that won’t settle into lines. It’s the perfect fit for your skin. 1 fl. oz"
    },
  {
        question: "Why are certain products unavailable to ship to Internationally?",
        answer: "Complexion-perfecting natural foundation enriched with antioxidant-packed superfruits, vitamins, and other skin-nourishing nutrients. Creamy liquid formula sets with a pristine matte finish for soft, velvety smooth skin.",
        greet:"Say hello to flawless, long-lasting foundation that comes in 7 melt-into-your-skin shades. This lightweight, innovative formula creates a smooth, natural matte finish that won’t settle into lines. It’s the perfect fit for your skin. 1 fl. oz"
    },  {
        question: "Why is my tracking number not updating?",
        answer: "Complexion-perfecting natural foundation enriched with antioxidant-packed superfruits, vitamins, and other skin-nourishing nutrients. Creamy liquid formula sets with a pristine matte finish for soft, velvety smooth skin.",
        greet:"Say hello to flawless, long-lasting foundation that comes in 7 melt-into-your-skin shades. This lightweight, innovative formula creates a smooth, natural matte finish that won’t settle into lines. It’s the perfect fit for your skin. 1 fl. oz"
    },



]

  return (
    <div className='font-[poppins] px-40 pb-10 flex gap-40 '>
        <div >
        <h2 className='text-3xl w-40 mb-5'>Discount</h2>
        </div>
        <div>
        {discountQuestions.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} greet={item.greet} />
        ))}
        </div>
      
    </div>
  )
}
