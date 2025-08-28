// Generated Next.js page

import React, { useState } from 'react';

// --- Design System Color Mappings (inferred from analysis and DS) ---
// These will be applied directly as Tailwind classes.
// Primary: #3B82F6 -> blue-600
// Secondary: #2DD4BF -> teal-400
// Background: #F9FAFB -> gray-50
// Dark Text: #1F2937 -> gray-900
// Medium Gray Text: #4B5563 -> gray-600
// Light Gray Border: #E5E7EB -> gray-200
// Pro Plan Card Background: #2563EB -> blue-700
// Pricing Tag BG: #ECFEFF -> cyan-50 (or similar light cyan)
// Pricing Tag Text: #06B6D4 -> cyan-600
// Newsletter Tag BG: #FCE7F3 -> pink-100 (or similar light pink)
// Newsletter Tag Text: #EC4899 -> pink-600

// --- Interfaces ---

interface NavLinkProps {
  label: string;
  href: string;
}

interface FeatureItemProps {
  text: string;
}

interface PricingCardData {
  planName: string;
  price: number;
  description: string;
  features: string[];
  isHighlighted?: boolean;
}

// --- Icons (Simple SVGs) ---

const CheckIcon: React.FC = () => (
  <svg className="w-5 h-5 text-blue-600 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
  </svg>
);

const EnvelopeIcon: React.FC = () => (
  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
  </svg>
);

const LogoIcon: React.FC = () => (
  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" />
  </svg>
);

// --- Component Building Blocks (Design System Components) ---

const NavLink: React.FC<NavLinkProps> = ({ label, href }) => (
  <a
    href={href}
    className="NavLink text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
  >
    {label}
  </a>
);

const ButtonPrimary: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
  <button
    className={`ButtonPrimary bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors duration-200 ${className || ''}`}
    {...props}
  >
    {children}
  </button>
);

const ButtonSecondary: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
  <button
    className={`ButtonSecondary bg-teal-400 text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-teal-300 transition-colors duration-200 ${className || ''}`}
    {...props}
  >
    {children}
  </button>
);

const Tag: React.FC<{ children: React.ReactNode; className?: string; icon?: React.ReactNode }> = ({ children, className, icon }) => (
  <span
    className={`Tag inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold uppercase ${className || ''}`}
  >
    {icon}
    {children}
  </span>
);

const Headline: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <h1
    className={`Headline text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight ${className || ''}`}
  >
    {children}
  </h1>
);

const Subheadline: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <p
    className={`Subheadline text-lg sm:text-xl text-gray-600 mt-4 max-w-2xl mx-auto ${className || ''}`}
  >
    {children}
  </p>
);

const BodyText: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <p className={`BodyText text-base text-gray-600 ${className || ''}`}>
    {children}
  </p>
);

const InputText: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => (
  <input
    type="email"
    className={`InputText w-full px-5 py-3 rounded-lg text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-200 ${className || ''}`}
    {...props}
  />
);

const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => (
  <li className="FeatureItem flex items-center mt-3 text-gray-600">
    <CheckIcon />
    <span>{text}</span>
  </li>
);

const FeatureList: React.FC<{ features: string[] }> = ({ features }) => (
  <ul className="FeatureList mt-6 space-y-2">
    {features.map((feature, index) => (
      <FeatureItem key={index} text={feature} />
    ))}
  </ul>
);

const PlanName: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <h3 className={`PlanName text-2xl font-bold ${className || ''}`}>
    {children}
  </h3>
);

const PriceDisplay: React.FC<{ price: number; className?: string }> = ({ price, className }) => (
  <p className={`PriceDisplay mt-4 text-5xl font-extrabold ${className || ''}`}>
    ${price}
    <span className="text-xl font-medium text-gray-500">/month</span>
  </p>
);

const UserSlider: React.FC = () => {
  const [users, setUsers] = useState(250); // Default from analysis

  return (
    <div className="flex items-center justify-center gap-4 mt-12 w-full max-w-lg mx-auto">
      <input
        type="range"
        min="10"
        max="1000"
        step="10"
        value={users}
        onChange={(e) => setUsers(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:rounded-full"
      />
      <div className="relative">
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-800 text-white text-sm font-semibold rounded-md shadow-lg whitespace-nowrap">
          {users} users
        </span>
        {/* Placeholder for actual slider handle design if needed */}
      </div>
    </div>
  );
};

const PricingCard: React.FC<PricingCardData> = ({ planName, price, description, features, isHighlighted }) => (
  <div
    className={`PricingCard p-8 rounded-xl shadow-lg border flex flex-col transition-all duration-300
      ${isHighlighted
        ? 'bg-blue-700 text-white border-blue-700 shadow-2xl scale-105'
        : 'bg-white text-gray-900 border-gray-200 hover:shadow-xl'
      }`}
  >
    <PlanName className={isHighlighted ? 'text-white' : 'text-gray-900'}>
      {planName}
    </PlanName>
    <PriceDisplay price={price} className={isHighlighted ? 'text-white' : 'text-gray-900'}>
      <span className={isHighlighted ? 'text-blue-200' : 'text-gray-500'}>/month</span>
    </PriceDisplay>
    <BodyText className={`mt-2 ${isHighlighted ? 'text-blue-100' : 'text-gray-600'}`}>
      {description}
    </BodyText>

    <ul className="FeatureList mt-6 space-y-2">
      {features.map((feature, index) => (
        <li key={index} className={`flex items-center mt-3 ${isHighlighted ? 'text-blue-100' : 'text-gray-600'}`}>
          <CheckIcon /> {/* Icon color overridden by parent if necessary for highlight */}
          <span>{feature}</span>
        </li>
      ))}
    </ul>

    {isHighlighted ? (
      <ButtonSecondary className="mt-auto block w-full">
        Upgrade Now
      </ButtonSecondary>
    ) : (
      <ButtonPrimary className="mt-auto block w-full">
        Get Started
      </ButtonPrimary>
    )}
  </div>
);


// --- Main Page Component ---
const HomePage: React.FC = () => {
  const pricingPlans: PricingCardData[] = [
    {
      planName: "Basic Plan",
      price: 19,
      description: "Ideal for small teams and startups getting started.",
      features: [
        "10 Team Members",
        "2GB Cloud Storage",
        "Basic Analytics",
        "Email Support",
        "Dashboard Access",
      ],
    },
    {
      planName: "Pro Plan",
      price: 39,
      description: "Perfect for growing businesses needing more power.",
      features: [
        "Unlimited Team Members",
        "10GB Cloud Storage",
        "Advanced Analytics",
        "Priority Email Support",
        "Customizable Dashboard",
        "API Access",
      ],
      isHighlighted: true,
    },
    {
      planName: "Business Plan",
      price: 99,
      description: "Designed for established companies with higher demands.",
      features: [
        "Unlimited Team Members",
        "50GB Cloud Storage",
        "Real-time Analytics",
        "24/7 Phone & Email Support",
        "Dedicated Account Manager",
        "Custom Integrations",
      ],
    },
    {
      planName: "Enterprise Plan",
      price: 249,
      description: "Comprehensive solution for large organizations.",
      features: [
        "Unlimited Team Members",
        "Unlimited Cloud Storage",
        "Advanced Security Features",
        "Dedicated Technical Support",
        "On-premise Deployment",
        "SLA Guarantee",
      ],
    },
  ];

  return (
    <div className="bg-gray-50 font-sans antialiased text-gray-900">
      {/* Header */}
      <header className="Header sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="Logo flex items-center">
            <LogoIcon className="text-blue-600" />
            <span className="font-bold text-2xl">enjoyy</span>
          </div>
          <nav className="Navigation hidden md:flex gap-x-8">
            <NavLink label="Home" href="#" />
            <NavLink label="Blog" href="#" />
            <NavLink label="Service" href="#" />
            <NavLink label="About" href="#" />
            <NavLink label="Contact" href="#" />
          </nav>
          <ButtonPrimary className="hidden md:block">Get Started</ButtonPrimary>
          {/* Mobile Menu Icon (Hamburger) - Not fully implemented, but placeholder for responsiveness */}
          <button className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </header>

      <main>
        {/* Pricing Section */}
        <section className="PricingSection py-16 md:py-24 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tag className="bg-cyan-50/50 text-cyan-600">Pricing plan</Tag>
          <Headline className="mt-4">
            Choose the Perfect Plan for Your Needs
          </Headline>
          <Subheadline>
            Our flexible pricing plans are designed to help businesses of all sizes succeed. Find the ideal solution tailored to your requirements.
          </Subheadline>

          <UserSlider />

          <div className="PricingCards grid gap-6 mt-16 md:grid-cols-2 lg:grid-cols-4">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="NewsletterSection bg-blue-600 text-white py-16 md:py-24 mt-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Tag className="bg-pink-100/50 text-pink-600" icon={<EnvelopeIcon />}>
              Newsletter
            </Tag>
            <Headline className="mt-4 text-white">
              Subscribe to our Newsletter
            </Headline>
            <BodyText className="mt-4 text-blue-100">
              Stay up-to-date with our latest news, exclusive offers, and expert insights. Join our community!
            </BodyText>
            <form className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <label htmlFor="email-input" className="sr-only">Email address</label>
              <InputText
                id="email-input"
                placeholder="Enter your email"
                aria-label="Enter your email"
                className="w-full sm:w-80"
              />
              <ButtonSecondary type="submit" className="w-full sm:w-auto">
                Subscribe
              </ButtonSecondary>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
