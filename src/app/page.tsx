"use client";

import { Copy, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

// Import shadcn/ui components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

// A custom Progress component to allow for dynamic color changes
type CustomProgressProps = {
  value: number;
  color: string;
};

const CustomProgress = ({ value, color }: CustomProgressProps) => (
  <div className="w-full bg-gray-300/90 rounded-full h-1">
    <div
      className="h-1 rounded-full"
      style={{
        width: `${value}%`,
        backgroundColor: color,
        transition: "width 0.3s ease-in-out, background-color 0.3s ease-in-out",
      }}
    ></div>
  </div>
);

// --- Main Application Component ---
export default function App() {
  // --- State Management ---
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeDigits, setIncludeDigits] = useState(true);
  const [includeLetters, setIncludeLetters] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [strengthText, setStrengthText] = useState("");
  const [strengthColor, setStrengthColor] = useState("#0D9488"); // Default to dark teal
  const [copied, setCopied] = useState(false);

  // --- Character Sets ---
  const DIGITS = "0123456789";
  const LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  const SIMILAR_CHARS = /[il1Lo0O2ZzS5s]/g;

  // --- Password Generation Logic ---
  const generatePassword = useCallback(() => {
    let charset = "";
    if (includeDigits) charset += DIGITS;
    if (includeLetters) charset += LETTERS;
    if (includeSymbols) charset += SYMBOLS;

    if (excludeSimilar) {
      charset = charset.replace(SIMILAR_CHARS, "");
    }

    if (charset === "") {
      setPassword("Select an option");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    setPassword(newPassword);
    setCopied(false);
  }, [length, includeDigits, includeLetters, includeSymbols, excludeSimilar]);

  // --- Effects ---
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  // This effect calculates strength based on the new length criteria.
  useEffect(() => {
    let text = "";
    let percentage = 0;
    let color = "#EF4444"; // default red

    if (length <= 6) {
      text = "Good, but we can make it stronger";
      percentage = 25;
      color = "#EF4444"; // red
    } else if (length >= 7 && length <= 8) {
      text = "It's just short of great";
      percentage = 50;
      color = "#F59E0B"; // orange
    } else if (length >= 9 && length <= 10) {
      text = "Now that's a strong password!";
      percentage = 75;
      color = "#10B981"; // green
    } else if (length >= 11) {
      text = "Ultimate password strength reached!";
      percentage = 100;
      color = "#0D9488"; // dark teal
    }

    setStrengthText(text);
    setPasswordStrength(percentage);
    setStrengthColor(color);
  }, [length]); // Dependency array now only contains length

  // --- Event Handlers ---
  const handleCopy = () => {
    if (!password || password === "Select an option") return;
    const textArea = document.createElement("textarea");
    textArea.value = password;
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error copying text", err);
    }
    document.body.removeChild(textArea);
  };

  // --- Helper to render password with colors ---
  const renderPasswordWithColors = (pass: string) => {
    const isDarkMode =
      typeof window !== "undefined" &&
      document.documentElement.classList.contains("dark");
    return pass.split("").map((char, index) => {
      let color = isDarkMode ? "#FFFFFF" : "#000000";
      if (DIGITS.includes(char)) {
        color = "#1438df";
      } else if (SYMBOLS.includes(char)) {
        color = "#df1111";
      }
      return (
        <span key={index} style={{ color, transition: "color 0.2s" }}>
          {char}
        </span>
      );
    });
  };

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-center">Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100/60 px-4 py-2 rounded-lg mb-4">
            {/* Password Display */}
            <div className="relative p-4 mb-4 rounded-lg flex items-center h-16">
              <div className="flex-grow font-mono text-xl truncate pr-10">
                {password
                  ? renderPasswordWithColors(password)
                  : "sTRTxPBD6d8?YTnY"}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={generatePassword}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                <RefreshCw className="h-8 w-8" />
              </Button>
            </div>

            {/* Strength Indicator */}
            <div className="mb-4 space-y-1">
              <CustomProgress value={passwordStrength} color={strengthColor} />
              <p
                className="text-xs font-normal"
                style={{ color: strengthColor }}
              >
                {strengthText}
              </p>
            </div>

            {/* Copy Button */}
            <Button onClick={handleCopy} className="w-full mb-6">
              <Copy className="mr-2 h-4 w-4" />
              {copied ? "Copied!" : "Copy this password"}
            </Button>
          </div>

          {/* Length Slider */}

          <div className="mb-6 space-y-4">
            <div className="flex-col justify-between items-center">
              <Label htmlFor="length" className="text-xs px-4 py-2 font-normal">
                LENGTH: {length}
              </Label>
              <div className="bg-gray-100/60 px-4 py-4 rounded-lg mb-4">
                <div className="flex w-full items-center space-x-4 text-xs text-muted-foreground">
                  <span>4</span>
                  <Slider
                    id="length"
                    min={4}
                    max={40}
                    step={1}
                    value={[length]}
                    onValueChange={(value) => setLength(value[0])}
                  />
                  <span>40</span>
                </div>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">OPTIONS</h4>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="digits" className="font-medium">
                  Digits
                </Label>
                <p className="text-sm text-muted-foreground">( e.g. 345 )</p>
              </div>
              <Switch
                id="digits"
                checked={includeDigits}
                onCheckedChange={setIncludeDigits}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="letters" className="font-medium">
                  Letters
                </Label>
                <p className="text-sm text-muted-foreground">( e.g. Aa )</p>
              </div>
              <Switch
                id="letters"
                checked={includeLetters}
                onCheckedChange={setIncludeLetters}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="symbols" className="font-medium">
                  Symbols
                </Label>
                <p className="text-sm text-muted-foreground">( e.g. @$# )</p>
              </div>
              <Switch
                id="symbols"
                checked={includeSymbols}
                onCheckedChange={setIncludeSymbols}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="similar" className="font-medium">
                  Similar characters
                </Label>
                <p className="text-sm text-muted-foreground">
                  ( e.g. 1l | O0 Z2 )
                </p>
              </div>
              <Switch
                id="similar"
                checked={excludeSimilar}
                onCheckedChange={setExcludeSimilar}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
