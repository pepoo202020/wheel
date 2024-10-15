// pages/congratulations.tsx
"use client";
import { useRouter } from "next/navigation";
import React from "react";

const points = [
  {
    point: 0,
    verse:
      "لأني أعلم الأفكار التي أفكر بها نحوكم، يقول الرب، أفكار سلام لا شر، لأعطيكم آخرة ورجاء. (إرميا 29:11)",
  },
  {
    point: 10,
    verse: "لا تتكل على فهمك، بل في كل طرقك إعرفه وهو يقوم سبلك. (أمثال 3:5-6)",
  },
  {
    point: 20,
    verse:
      "فأنت يا ابني، كن قوياً في النعمة التي في المسيح يسوع. (2 تيموثاوس 2:1)",
  },
  {
    point: 30,
    verse:
      "اجتهد أن تقيم نفسك لله مزكياً، عاملاً لا يخزى، مختبراً كلمة الحق. (2 تيموثاوس 2:15)",
  },
  {
    point: 40,
    verse: "أنت نور العالم. مدينة موضوعة على جبل لا يمكن أن تختفي. (متى 5:14)",
  },
  {
    point: 50,
    verse:
      "لأنني عالم بالأفكار التي أفكر بها نحوكم، أفكار سلام لا شر. (إرميا 29:11)",
  },
  {
    point: 60,
    verse: "تكونون لي شهوداً، يقول الرب، من أقصى الأرض إلى أقصاها. (أعمال 1:8)",
  },
  {
    point: 70,
    verse:
      "إن كنت في الضيق، فافرح، لأنه في ذلك الوقت تكون قريباً إلى الله. (يعقوب 1:2)",
  },
  {
    point: 80,
    verse:
      "فليكن عندكم كل إنسان سريعاً في السمع، بطيئاً في الكلام، بطيئاً في الغضب. (يعقوب 1:19)",
  },
  {
    point: 90,
    verse:
      "كل ما فعلتم، فاعملوه من القلب، كأنكم تعملون للرب لا للناس. (كولوسي 3:23)",
  },
  {
    point: 100,
    verse: "تذكر خالقك في أيام شبابك، قبل أن تأتي أيام الشر. (جامعة 12:1)",
  },
];

export default function Congrate({ params }: { params: { point: string } }) {
  const router = useRouter();

  // Parse point as an integer and handle null
  const point = params.point ? parseInt(params.point, 10) : 0;

  // Find the verse corresponding to the selected point
  const verse =
    points.find((p) => p.point === point)?.verse || "لا توجد آية متاحة.";

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-500 to-blue-700 text-white">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-8 shadow-lg flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center">🎉 مبروك! 🎉</h1>
        <p className="mt-4 text-lg text-center">
          الرقم الذي حصلت عليه هو:{" "}
          <span className="font-extrabold text-2xl">{point}</span>
        </p>
        <p className="mt-6 text-lg text-center">{verse}</p>
        <button
          onClick={() =>
            router.push("https://chat.whatsapp.com/L4i2YITh1nx2K1Ml7yVnzn")
          } // Navigate back to home
          className="mt-6 px-6 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg transition duration-300 ease-in-out"
        >
          زيارة صفحة الواتس اب الرسمية
        </button>
      </div>
    </div>
  );
}
