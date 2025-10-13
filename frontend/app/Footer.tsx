"use client";
import { Separator } from "@radix-ui/react-separator";

export default function Footer() {
  return (
    <footer>
      {/* <Separator className="bg-gray-200 dark:bg-gray-800 h-px w-full" orientation="horizontal"/> */}
      <div className="mx-auto flex w-full justify-center p-4">
        <div className="flex object-center gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Contact Us</p>
          </div>
          <Separator
            className="bg-gray-200 dark:bg-gray-800 w-px h-6"
            orientation="vertical"
          />
          <div>
            <p className="text-sm text-muted-foreground">123-456-7890</p>
          </div>
          <Separator
            className="bg-gray-200 dark:bg-gray-800 w-px h-6"
            orientation="vertical"
          />
          <div>
            <p className="text-sm text-muted-foreground">
              help@mobilemechanic.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
