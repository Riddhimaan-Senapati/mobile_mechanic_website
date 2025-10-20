"use client";
import NavBar from "../NavBar";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";

export default function Messaging() {
  return (
    <div>
      <NavBar />

      <h1 className="text-lg">Messaging</h1>

      <div className="flex flex-col gap-1">
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>October 6, 2025 - 3:00PM-5:00PM</ItemTitle>
            <ItemDescription>
              You: My neighbors love to block my driveway so you might not be
              able to park your car in the driveway, is that OK?
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">
              Open Chat
            </Button>
          </ItemActions>
        </Item>
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>September 26, 2025 - 9:00AM-11:00AM</ItemTitle>
            <ItemDescription>You: Thanks!</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="outline" size="sm">
              Open Chat
            </Button>
          </ItemActions>
        </Item>
      </div>
    </div>
  );
}
