"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog.tsx";
import { Button } from "./ui/button.tsx";
import { Badge } from "./ui/badge.tsx";
import { Calendar, Trophy, Sparkles, ArrowRight } from "lucide-react";

export function EventModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSeenModal, setHasSeenModal] = useState(false);

  useEffect(() => {
    const seenModal = sessionStorage.getItem("hasSeenEventModal");
    setHasSeenModal(!!seenModal);

    if (!seenModal) {
      const timer = setTimeout(() => {

        setIsOpen(true);
        sessionStorage.setItem("hasSeenEventModal", "true");
        setHasSeenModal(true);
      }, 3000); 

      return () => clearTimeout(timer);
    }
  }, []);

  if (isOpen) {
    console.log("Dialog is being rendered!");
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 overflow-hidden border-2 border-purple-200 bg-white">
        {/* Hidden accessibility elements */}
        <DialogHeader className="sr-only">
          <DialogTitle>I'm Dreaming of an Art Christmas</DialogTitle>
          <DialogDescription>
            Join our exciting artwork competition with the theme "The True Meaning
            of Christmas" and win amazing prizes!
          </DialogDescription>
        </DialogHeader>

        {/* Colorful Header */}
        <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-8 pb-12">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3">
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <Badge className="bg-white/90 text-purple-700 hover:bg-white px-2 sm:px-3 py-1 text-xs sm:text-sm">
              Special Event
            </Badge>
          </div>

          <h2 className="text-white text-xl sm:text-2xl md:text-3xl mb-2 leading-tight">
            🎨 I'm Dreaming of an Art Christmas
          </h2>
          <p className="text-white/90 text-sm sm:text-base md:text-lg">
            Artwork Competition - "The True Meaning of Christmas"
          </p>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8 -mt-4 sm:-mt-6 bg-white rounded-t-2xl sm:rounded-t-3xl relative z-10">
          <div className="space-y-4 sm:space-y-6">
            {/* Event Highlights */}
            <div className="grid gap-3 sm:gap-4">
              <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-1.5 sm:p-2 flex-shrink-0">
                  <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="mb-1 text-sm sm:text-base">Amazing Prizes</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Win up to ₱1,000 cash prize plus consolation prizes for all
                    participants!
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-1.5 sm:p-2 flex-shrink-0">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="mb-1 text-sm sm:text-base">Important Dates</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Submission Deadline: December 18, 2025 | Awards: December 20,
                    2025
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="border-t pt-4 sm:pt-6 mt-4 sm:mt-6">
              <p className="text-center text-muted-foreground mb-4 sm:mb-6 text-xs sm:text-sm md:text-base px-2">
                Ready to showcase your artistic talents? Check out the complete
                competition rules, judging criteria, and submission guidelines!
              </p>

              <div className="flex flex-col gap-3 w-full">
                <a href="/Events/event-guidelines" className="w-full">
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg text-sm sm:text-base min-h-[44px]"
                    size="lg"
                  >
                    <span className="flex items-center justify-center gap-2">
                      View Competition Guidelines
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </span>
                  </Button>
                </a>

                <Button
                  onClick={() => setIsOpen(false)}
                  variant="outline"
                  size="lg"
                  className="w-full border-2 hover:bg-gray-50 text-sm sm:text-base min-h-[44px]"
                >
                  Maybe Later
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}