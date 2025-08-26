import React, { useState } from 'react';

// Tailwind CSS classes inferred from design_json and analysis
const classes = {
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  sectionPaddingY: 'py-24 lg:py-32', // Approx 100-120px
  sectionSpacingY: 'mb-24 lg:mb-32', // Approx 100-120px
  header: 'bg-white shadow-sm sticky top-0 z-50',
  headerContent: 'flex justify-between items-center py-4',
  logo: 'text-neutral-gray-900 font-bold text-2xl', // Approx heading-h2-desktop for "enjooy"
  navLink: 'text-neutral-gray-900 font-semibold hover:text-primary-blue-500',
  buttonPrimary: 'bg-primary-blue-500 text-neutral-white font-semibold py-3 px-6 rounded-md hover:bg-primary-blue-600 shadow-sm transition-all duration-300',
  buttonSecondary: 'bg-accent-green-500 text-neutral-white font-semibold py-3 px-6 rounded-md hover:bg-accent-green-600 shadow-sm transition-all duration-300',
  buttonOutline: 'bg-transparent border border-primary-blue-500 text-primary-blue-500 font-semibold py-3 px-6 rounded-md hover:bg-primary-blue-500 hover:text-neutral-white transition-all duration-300',
  inputEmail: 'w-full py-3 px-4 border border-neutral-gray-100 rounded-md placeholder-neutral-gray-300 text-neutral-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-blue-500/20 focus:border-primary-blue-500',
  pricingCardDefault: 'bg-white rounded-xl shadow-sm p-8 lg:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-md',
  pricingCardFeatured: 'bg-primary-blue-500 text-neutral-white rounded-xl shadow-md p-8 lg:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
  h1: 'text-heading-h1-desktop font-extrabold text-neutral-gray-900 leading-tight text-center mb-6', // Mobile variant not specified, assume desktop for now for simplicity, adjust for responsive
  h1Subtitle: 'text-body-lg text-neutral-gray-500 text-center mb-12',
  h2: 'text-heading-h2-desktop font-semibold text-neutral-gray-900 mb-4',
  h3: 'text-heading-h3-desktop font-bold text-neutral-white mb-4',
  priceDisplay: 'text-display-price-desktop font-bold text-neutral-gray-900',
  bodyBase: 'text-body-base text-neutral-gray-500',
  checkmarkIcon: 'w-5 h-5 mr-2 text-primary-blue-500',
  newsletterBg: 'bg-primary-blue-500',
  newsletterLabel: 'bg-newsletter-pink-100 text-neutral-gray-900 text-xs font-medium px-2.5 py-0.5 rounded-full inline-flex items-center',
  newsletterIcon: 'w-6 h-6 mr-2 text-neutral-white',
  sliderTrack: 'w-full h-1 bg-primary-blue-500 rounded-full',
  sliderThumb: 'w-5 h-5 bg-white border-2 border-primary-blue-500 rounded-full cursor-grab',
  sliderValueDisplay: 'bg-neutral-gray-700 text-neutral-white text-body-sm px-2 py-1 rounded-sm'
};

const pricingPlans = [
  {
    title: 'Basic Plan',
    price: '$15/month',
    features: [
      'Access to basic features',
      '20 GB Storage',
      'Basic Reporting',
      'Email Support'
    ],
    isFeatured: false,
  },
  {
    title: 'Pro Plan',
    price: '$45/month',
    features: [
      'All Basic features',
      '100 GB Storage',
      'Advanced Reporting',
      'Priority Email Support',
      'Phone Support'
    ],
    isFeatured: true,
  },
  {
    title: 'Business Plan',
    price: '$75/month',
    features: [
      'All Pro features',
      '500 GB Storage',
      'Custom Reporting',
      '24/7 Phone Support',
      'Dedicated Account Manager'
    ],
    isFeatured: false,
  },
  {
    title: 'Enterprise Plan',
    price: '$120/month',
    features: [
      'All Business features',
      'Unlimited Storage',
      'Real-time Analytics',
      '24/7 VIP Support',
      'Custom Integrations',
    ],
    isFeatured: false,
  },
];

const PricingPlanPage: React.FC = () => {
  const [users, setUsers] = useState(250);

  return (
    <div className="bg-background min-h-screen font-sans">
      {/* Header */}
      <header className={classes.header}>
        <div className={classes.container}>
          <div className={classes.headerContent}>
            <a href="#" className={classes.logo}>enjooy</a>
            <nav className="hidden md:flex space-x-8 items-center">
              <a href="#" className={classes.navLink}>Home</a>
              <a href="#" className={classes.navLink}>Blog</a>
              <a href="#" className={classes.navLink}>Service</a>
              <a href="#" className={classes.navLink}>About</a>
              <a href="#" className={classes.navLink}>Contact</a>
              <button className={classes.buttonPrimary}>Get Started</button>
            </nav>
            <div className="md:hidden">
              {/* Hamburger menu icon placeholder */}
              <svg className="w-6 h-6 text-neutral-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Pricing Plan Section */}
        <section className={`${classes.sectionPaddingY} ${classes.sectionSpacingY}`}>
          <div className={classes.container}>
            <h1 className={classes.h1}>
              Choose the Perfect Plan for Your Needs
            </h1>
            <p className={classes.h1Subtitle}>
              Access our comprehensive features designed to scale with your business. Select a plan that fits your current requirements and grow with us.
            </p>

            {/* User Slider & Button */}
            <div className="flex flex-col items-center mb-16">
              <div className="relative w-full max-w-md mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className={`${classes.bodyBase} font-semibold text-neutral-gray-900`}>Users:</span>
                  <span className={classes.sliderValueDisplay}>{users} users</span>
                </div>
                {/* Mock Slider - Actual slider implementation would be more complex */}
                <div className="relative flex items-center h-1 bg-gray-200 rounded-full">
                  <div className={classes.sliderTrack} style={{ width: `${(users / 1000) * 100}%` }}></div>
                  <div
                    className={classes.sliderThumb}
                    style={{ left: `calc(${(users / 1000) * 100}% - 10px)`, position: 'absolute' }} // Adjusting for thumb width
                  ></div>
                </div>
              </div>
              <button className={classes.buttonPrimary}>Adjust Plan</button>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={plan.isFeatured ? classes.pricingCardFeatured : classes.pricingCardDefault}
                >
                  <h2 className={plan.isFeatured ? `${classes.h2} !text-neutral-white` : classes.h2}>
                    {plan.title}
                  </h2>
                  <p className={plan.isFeatured ? `${classes.priceDisplay} !text-neutral-white` : classes.priceDisplay}>
                    {plan.price}
                  </p>
                  <ul className="mt-8 space-y-3">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className={`flex items-start ${plan.isFeatured ? 'text-neutral-white' : classes.bodyBase}`}>
                        {/* Checkmark Icon */}
                        <svg
                          className={`flex-shrink-0 w-5 h-5 mr-2 ${plan.isFeatured ? 'text-neutral-white' : classes.checkmarkIcon}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10">
                    <button className={plan.isFeatured ? classes.buttonSecondary : classes.buttonOutline}>
                      Choose Plan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Subscription Section */}
        <section className={`${classes.newsletterBg} ${classes.sectionPaddingY}`}>
          <div className={classes.container}>
            <div className="flex flex-col lg:flex-row items-center justify-between text-center lg:text-left">
              <div className="mb-10 lg:mb-0 lg:mr-12">
                <span className={classes.newsletterLabel}>
                  {/* Newsletter Bell/Mail Icon */}
                  <svg
                    className={classes.newsletterIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  Newsletter
                </span>
                <h3 className={classes.h3}>Subscribe to our Newsletter</h3>
                <p className={`${classes.bodyLg} !text-neutral-white mt-4`}>
                  Stay updated with our latest features and exclusive offers. Join our community!
                </p>
              </div>
              <div className="w-full lg:w-auto flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={classes.inputEmail}
                />
                <button className={classes.buttonPrimary}>Subscribe</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PricingPlanPage;
