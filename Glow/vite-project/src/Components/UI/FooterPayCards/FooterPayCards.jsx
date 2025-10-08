import React from 'react'

export default function FooterPayCards() {
    const payments = [
        {
          id: "visa",
          title: "Visa",
          svg: (
            <svg
              viewBox="0 0 38 24"
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="24"
              role="img"
              aria-labelledby="pi-visa"
            >
              <title id="pi-visa">Visa</title>
              <path
                opacity=".07"
                d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
              ></path>
              <path
                fill="#fff"
                d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
              ></path>
              <path
                d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zM14.7 14.2l1.2-5.5c-.8 0-1.8 0-2.6 0l-1.2 5.5h2.6zm11-5.5c-.7 0-1.3 0-1.9.6-.4-.4-1.2-.6-2-.6-1.8 0-3.3 1-3.3 2.4 0 1 1 1.5 1.7 1.8.8.3 1 .5 1 1 0 .5-.6.8-1.2.8-.7 0-1.2-.2-1.8-.6l-.3.2-.4 1.7c.5.2 1.5.5 2.5.5 2.3 0 3.7-1 3.7-2.5 0-.8-.6-1.4-1.7-1.8-.7-.3-1-1-.7-1.2.2-.2.6-.3 1-.3.5 0 .8 0 1.3.3l.3.2 1.3-1c-.3-.2-.9-.8-2-1.1 0 0 .7 0 0 0zm-4.3 0c0-.5 0 0 0 0zm-8-2.3c-.5 0-.8.4-1 1l-2 6.8H8.7l-.5-2.8c-.2-1.2-1-2.2-2-2.7l1.7 6.6h3l4.5-11.1h-3zm16.3 2.3c.3 1 .8 2.7 1.5 5.4h2.5l-2.3-6.6c-.2-.5-.7-1-1.5-1h-3.4L25.9 16h2.6l.5-2.2c.3 0 2.6 0 3 0 0 .5.2 2.2.2 2.2H35l-.3-1.5h-1.9l-.3-1.8c-.2-1-.5-1.8-1-2.2-.2-.4-.7-.6-1.1-.7z"
                fill="#142688"
              ></path>
            </svg>
          ),
        },
        {
          id: "mastercard",
          title: "Mastercard",
          svg: (
            <svg
              viewBox="0 0 38 24"
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="24"
              role="img"
              aria-labelledby="pi-master"
            >
              <title id="pi-master">Mastercard</title>
              <path
                opacity=".07"
                d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
              ></path>
              <path
                fill="#fff"
                d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
              ></path>
              <circle fill="#EB001B" cx="15" cy="12" r="7"></circle>
              <circle fill="#F79E1B" cx="23" cy="12" r="7"></circle>
              <path
                fill="#FF5F00"
                d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"
              ></path>
            </svg>
          ),
        },
        {
          id: "amex",
          title: "American Express",
          svg: (
            <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" width="38" height="24" role="img" aria-labelledby="pi-amex">
              <title id="pi-amex">American Express</title>
              <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path>
              <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path>
              <path fill="#2E77BC" d="M7 7h24v10H7z"></path>
              <text x="50%" y="60%" fill="white" fontSize="6" fontWeight="bold" textAnchor="middle">
                AMEX
              </text>
            </svg>
          ),
        },
        {
          id: "paypal",
          title: "PayPal",
          svg: (
            <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" width="38" height="24" role="img" aria-labelledby="pi-paypal">
              <title id="pi-paypal">PayPal</title>
              <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path>
              <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path>
              <text x="50%" y="60%" fill="#003087" fontSize="6" fontWeight="bold" textAnchor="middle">
                PayPal
              </text>
            </svg>
          ),
        },
        {
          id: "diners",
          title: "Diners Club",
          svg: (
            <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" width="38" height="24" role="img" aria-labelledby="pi-diners">
              <title id="pi-diners">Diners Club</title>
              <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path>
              <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path>
              <circle cx="19" cy="12" r="6" fill="#0079BE"></circle>
              <text x="50%" y="60%" fill="white" fontSize="5" fontWeight="bold" textAnchor="middle">
                DC
              </text>
            </svg>
          ),
        },
        {
          id: "discover",
          title: "Discover",
          svg: (
            <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" width="38" height="24" role="img" aria-labelledby="pi-discover">
              <title id="pi-discover">Discover</title>
              <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path>
              <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path>
              <text x="50%" y="60%" fill="#FF6000" fontSize="6" fontWeight="bold" textAnchor="middle">
                Discover
              </text>
            </svg>
          ),
        },
      ];
    return (
        <ul className="flex gap-3 flex-wrap items-center justify-center">
          {payments.map(({ id, svg }) => (
            <li key={id} className="list-none">
              {svg}
            </li>
          ))}
        </ul>
      );
}
  