export default function PrivacyPolicyPage() {
    return (
      <div className="flex min-h-screen flex-col bg-white text-gray-800">
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative py-16 md:py-20 bg-orange-50 shadow-inner">
            <div className="container mx-auto px-6 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-orange-900 mb-4">
                Privacy Policy
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                Last Updated: May 7, 2023
              </p>
            </div>
          </section>
  
          {/* Privacy Policy Content */}
          <section className="py-16 md:py-20">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto space-y-8 text-gray-700 leading-relaxed">
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900">Introduction</h2>
                  <p>
                    At Apna PG, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
                    and safeguard your information when you visit our website or use our services...
                  </p>
                </div>
  
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900">Information We Collect</h2>
                  <p>We collect information that you provide directly to us...</p>
                  <ul className="list-disc list-inside pl-4 space-y-1">
                    <li><strong>Personal Information:</strong> Your name, email, etc.</li>
                    <li><strong>Profile Information:</strong> Property details for landlords.</li>
                    <li><strong>Usage Data:</strong> IP address, browser type, etc.</li>
                  </ul>
                </div>
  
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900">How We Use Your Information</h2>
                  <p>We may use your information to:</p>
                  <ul className="list-disc list-inside pl-4 space-y-1">
                    <li>Provide and improve services</li>
                    <li>Process transactions</li>
                    <li>Send alerts and updates</li>
                    <li>Respond to support queries</li>
                    <li>Analyze trends</li>
                    <li>Prevent fraud</li>
                  </ul>
                </div>
  
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900">Sharing Your Information</h2>
                  <p>We may share your data with landlords, tenants, and service providers...</p>
                </div>
  
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900">Data Security</h2>
                  <p>We use security measures to protect your personal data...</p>
                </div>
  
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900">Cookies and Tracking</h2>
                  <p>We use cookies to enhance your experience...</p>
                </div>
  
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900">Your Rights</h2>
                  <p>You may have rights to access or modify your data. Contact us to exercise these rights.</p>
                </div>
  
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900">Children's Privacy</h2>
                  <p>We do not knowingly collect data from individuals under 18.</p>
                </div>
  
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900">Changes to This Policy</h2>
                  <p>We may update this Privacy Policy. Changes are effective when posted.</p>
                </div>
  
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-gray-900">Contact Us</h2>
                  <ul className="list-none pl-0 space-y-1">
                    <li><strong>Email:</strong> privacy@apnapg.com</li>
                    <li><strong>Phone:</strong> +91 98765 43210</li>
                    <li><strong>Mail:</strong> 123 Tech Park, Sector 15, Gurugram, Haryana 122001</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }