"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./styles/Home.module.css";
import Image from "next/image";

const points = Array.from({ length: 11 }, (_, i) => i * 10);

export default function Home() {
  const nameTextInput = "الاسم ثلاثي";
  const phoneTextInput = "رقم التليفون";

  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [finalRotation, setFinalRotation] = useState<number>(0); // لحفظ الزاوية النهائية
  const router = useRouter();

  const spinWheel = async () => {
    if (!name || !phone) {
      return alert("يرجى إدخال البيانات أولاً.");
    }

    setIsSpinning(true);
    const randomPoint = points[Math.floor(Math.random() * points.length)];
    const degreesToSpin = 3600 + randomPoint * 36; // إضافة دوران إضافي
    setFinalRotation(degreesToSpin);

    try {
      const response = await fetch("/api/saveData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, point: randomPoint }), // إرسال البيانات إلى الـ API
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message); // إظهار رسالة التنبيه من الخادم
        setIsSpinning(false);
        setName("");
        setPhone("");
        return; // عدم الانتقال للصفحة التالية
      }

      // Navigate to the congratulations page if the data is saved successfully
      setSelectedPoint(randomPoint);
      setIsSpinning(false);
      // Wait 1 second before navigating to the congratulations page
      setTimeout(() => {
        router.push(`/congrate?point=${randomPoint}`); // Navigate to the congratulations page
      }, 2000); // 1000 ms = 1 second
    } catch (error) {
      alert("حدث خطأ أثناء حفظ البيانات.");
      console.log(error);
      setIsSpinning(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    spinWheel();
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-blue-500 to-blue-700 flex flex-col">
      <header className="w-full py-1 mb-1 bg-black text-white flex items-center justify-center text-lg font-bold">
        <Image src="/logo.png" alt="logo" width={40} height={40} />
      </header>
      <section className="flex flex-col items-center justify-center flex-1 text-center">
        <h1 className="text-2xl font-bold text-white mb-2">
          ارجو املاء البيانات الاتية قبل تشغيل عجلة الحظ
        </h1>
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-8 shadow-lg">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name" className={styles.label}>
              {nameTextInput}
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={styles.input}
            />
            <br />
            <label htmlFor="phone" className={styles.label}>
              {phoneTextInput}
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className={styles.input}
            />
            <br />
            <div className={styles.wheelContainer}>
              <div
                className={`${styles.wheel} ${isSpinning ? styles.spin : ""}`}
                style={{ transform: `rotate(${finalRotation}deg)` }} // تحديد زاوية الدوران النهائية
              >
                {points.map((point, index) => {
                  const isSelected = selectedPoint === point; // تحقق مما إذا كان الرقم هو الرقم المختار
                  return (
                    <div
                      key={index}
                      className={`${styles.wheelSegment} ${
                        isSelected ? styles.selected : ""
                      }`} // إضافة نمط خاص للرقم المختار
                      style={
                        {
                          transform: `rotate(${index * 36}deg)`,
                          "--index": index,
                        } as React.CSSProperties
                      }
                    >
                      <span>{point}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <button type="submit" className={styles.spinButton}>
              ابدأ الدوران
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
