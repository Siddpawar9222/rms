import LandingIntroImg from '../../assets/images/intro.png'

function LandingIntro() {

  return (
    // <div className="hero min-h-full rounded-l-xl bg-base-200">
    //   <div className="hero-content py-12">
    //     <div className="max-w-md">

    //       <h1 className='text-3xl text-center font-bold '>Record Management System</h1>

    //       <div className="text-center mt-12"><img src={LandingIntroImg} alt="Dashwind Admin Template" className="w-48 inline-block"></img></div>

    //       {/* Importing TemplatePointers component */}
    //       <TemplatePointers />

    //     </div>

    //   </div>
    // </div>

    <div className="hero min-h-full rounded-l-xl bg-base-100">
      <div className="hero-content py-12">
        <div className="max-w-md text-center mx-auto"> {/* Centered all content with mx-auto */}

          {/* Heading */}
          <h1 className='text-3xl font-bold text-center'>Record Management System</h1>

          {/* Image */}
          <div className="text-center mt-12">
            <img src={LandingIntroImg} alt="Dashwind Admin Template" className="w-48 inline-block" />
          </div>

          <div className="mt-8 mx-20 space-y-4">
            <div className="flex items-start">
              <span className="w-6">✓</span>
              <span className="font-semibold text-left">Link Your Google Account</span>
            </div>
            <div className="flex items-start">
              <span className="w-6">✓</span>
              <span className="font-semibold text-left">Handle Student Data via Sheets</span>
            </div>
            <div className="flex items-start">
              <span className="w-6">✓</span>
              <span className="font-semibold text-left">Create Batches and more</span>
            </div>
            <div className="flex items-start">
              <span className="w-6">✓</span>
              <span className="font-semibold text-left">Reports and Audit</span>
            </div>
          </div>



        </div>
      </div>
    </div>
  )

}

export default LandingIntro
