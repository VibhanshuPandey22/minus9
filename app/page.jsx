"use client";
import LoginDiv from "@components/LoginDiv";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const landingPageDesc = [
  {
    id: 1,
    text: "When we are happy, we often say we're on cloud 9, soaking in the comfort of happiness. But when the tides turn, and we feel the weight of sadness, it's as if we've descended to a place just as vivid but far far darker - cloud minus9, as I like to call it.",
  },
  {
    id: 2,
    text: "Cloud minus9 is where feelings find expression. It's a place full of quiet melancholy, raw emotion, and deep reflection. Here, words carry the weight of our experiences when we're not flying high, but grounding ourselves in truth.",
  },
  {
    id: 3,
    text: "While cloud 9 is known to represent the joy we chase, cloud minus9 is the space where we sink when sadness takes hold, and here, we express it. Welcome!",
  },
  {
    id: 4,
    text: "For me, cloud minus9 is where vulnerability transforms into strength. In this space, we embrace the moments of sadness and self-doubt, knowing that these feelings don't diminish us, they fortify us. Here, sharing our inner thoughts isn't a sign of defeat but a powerful expression of resilience.",
  },
  {
    id: 5,
    text: "Happiness lifts us to cloud 9, a space where everything feels light and effortless. But just as every hill that goes up must come down, when sorrow pulls us under, we land somewhere just as sharp, I like call it cloud minus9.",
  },
  {
    id: 6,
    text: "Ups and downs, happiness and sadness, a high and a low, cloud 9 and and cloud minus 9, aren't they all a complementary must?",
  },
  {
    id: 7,
    text: "Cloud 9 is where we rise, cloud minus9 is where we fall, cloud 9 lifts us high, but cloud minus9 brings us back down, aren't they so intertwined? Every moment of happiness owes its meaning to the times of sadness, and together they create the rhythm of our lives.",
  },
  {
    id: 8,
    text: "When we're in a place that feels like the top, and we might often call it cloud 9, the height really makes the world look small, and problems seem so far off. Dare falling off that height, and you'd unravel the grounding truth - of cloud minus9.",
  },
  {
    id: 9,
    text: "To every beauty, is a beast. To every rose, are thorns. To every jump, a fall. And every 9, a minus9.",
  },
  {
    id: 10,
    text: "Cloud 9 is when you are in a state of extreme happiness or bliss. And cloud minus9, well, the opposite. Now, if you think hard enough, cloud9 is basically cloud minus9. I'll say it again, if you think hard enough.",
  },
];

const LandingPage = () => {
  let randomIndex;
  const { data: session } = useSession();
  const router = useRouter();

  const [openLoginDiv, setOpenLoginDiv] = useState(false);
  const [randomDesc, setRandomDesc] = useState("");

  const randomIndexRef = useRef(null);

  const handleClick = () => {
    setOpenLoginDiv((prev) => !prev);
  };

  useEffect(() => {
    randomIndexRef.current = Math.floor(landingPageDesc.length * Math.random());
    const randomTextObject = landingPageDesc[randomIndexRef.current];
    setRandomDesc(randomTextObject.text);
  }, []);

  return (
    <>
      {!session?.user ? (
        <section
          className={`flex-center mx-5 px-7 flex-col gap-5} ${
            openLoginDiv && "opacity-25"
          }`}
        >
          <div className="flex-center flex-col gap-10 w-full max-w-5xl">
            <p className="mt-5 max-sm:mt-1 text-2xl font-mukta text-platinum max-sm:text-lg text-center px-3 italic">
              "{randomDesc}"
            </p>
            <p className="mt-14 max-sm:mt-7 text-5xl tracking-tight font-medium font-mukta text-cyan max-lg:text-4xl max-md:text-5xl max-sm:text-xl text-center"></p>
          </div>

          <div className="flex w-full justify-start text-cyan text-3xl max-sm:text-xl mb-2 font-mukta font-semibold">
            Who am i?
          </div>
          <div className="flex bg-extra p-10">
            <div></div>
            <div>
              <p className=" text-lg max-sm:text-sm tracking-normal font-medium font-mukta text-platinum">
                Hi reader, I welcome you to{" "}
                <span className="text-cyan">minus9</span>. I am{" "}
                <span className="text-cyan">Vibhanshu Pandey</span> and I like
                to express myself through words, especially when I feel heavy,
                or find myself in a dark place.
                <br />
                <br />
                I write simple, raw poems that resonate with the heart, that i'm
                sure will invite you to connect deeply with your own
                experiences. Each piece will offer a fresh perspective on
                emotions that often go unspoken, capturing the essence of those
                difficult feelings.
                <br />
                <br />
                My philosophy embraces the idea thats{" "}
                <span className="text-cyan">
                  nothing is entirely black or white, it's always a shade of
                  grey, unique to each individual
                </span>
                . This belief shapes my poetry, encouraging readers to embrace
                their own interpretations and experiences. In this space, you're
                free to reflect on your own shades, recognizing that every
                emotion holds its own beauty.
                <br />
                <br />
                So, I invite you to see how these different feelings mix in our
                lives, showing the depth of what it means to be human in all its
                ways.{" "}
                <span
                  className="text-yellow-600 cursor-pointer hover:text-yellow-500 transition-all duration-200"
                  onClick={handleClick}
                >
                  Login to start.
                </span>
              </p>
            </div>
          </div>

          {/* <div className="mt-10">
            <p
              id="signInButton"
              onClick={handleClick}
              className={`cursor-pointer text-2xl max-sm:text-xl font-medium font-mukta text-platinum hover:text-cyan transition-all duration-200 ${
                openLoginDiv && "pointer-events-none"
              }`}
            >
              Login to read
            </p>
          </div> */}
        </section>
      ) : (
        router.push("/home")
      )}
      {openLoginDiv && (
        <LoginDiv openLoginDiv={openLoginDiv} handleClick={handleClick} />
      )}
    </>
  );
};

export default LandingPage;

{
  /* <>
  {session?.user ? (
    <center className="mt-10">
      <button onClick={signOut} className="border-black border-2 p-1">
        Logout
      </button>
    </center>
  ) : (
    providers &&
    Object.values(providers).map((provider) => (
      <center className="mt-10">
        <button
          onClick={() => signIn(provider.id)}
          className="border-black border-2 p-1"
        >
          Login with {provider.name}
        </button>
      </center>
    ))
  )}
</> */
}
