import Button from "./Button";

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} />
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        {/* Text content - Positioned above images */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase">
            Join Boulvard
          </p>
          <h1
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
            dangerouslySetInnerHTML={{
              __html:
                "let&#39;s b<b>u</b>ild the <br /> new era of <br /> g<b>a</b>ming t<b>o</b>gether.",
            }}
          />
          <Button title="contact us" containerClass="mt-10 cursor-pointer" />
        </div>

        {/* Background Images */}
        <div className="absolute -left-20 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96 top-0">
          <ImageClipBox
            clipClass="contact-clip-path-1"
            src="src\assets\contact-1.webp"
          />
          <ImageClipBox
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
            src="src\assets\contact-2.webp"
          />
        </div>

        <div className="absolute -top-20 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="src\assets\swordman-partial.webp"
            clipClass="absolute md:scale-125"
          />
          <ImageClipBox
            src="src\assets\swordman.webp"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
