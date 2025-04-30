import React, { FocusEvent, useState } from "react";
import Card from "@mui/joy/Card";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Switch from "@mui/joy/Switch";
import { CardContent } from "@mui/joy";

function Player({
  name,
  rank,
  attending,
}: {
  name: string;
  rank: string | null;
  attending: boolean;
}) {
  return (
    <Card
      size="sm"
      variant="soft"
      sx={{
        width: 400,
      }}
    >
      <CardContent orientation="horizontal">
        <Input
          placeholder="Player Name"
          variant="outlined"
          size="sm"
          color="neutral"
          value={name}
          onChange={(e) => {}}
          sx={{
            flexGrow: 1,
            maxWidth: 300,
          }}
        />
        <Select
          placeholder="Rank"
          name="rank"
          variant="outlined"
          size="sm"
          sx={{ minWidth: 100 }}
          value={rank}
          onChange={(_e, newVal) => {}}
        >
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
          <Option value="4">4</Option>
          <Option value="5">5</Option>
        </Select>
        <Switch
          checked={attending}
          onChange={(e) => {}}
          color={attending ? "primary" : "neutral"}
          variant={attending ? "solid" : "outlined"}
          endDecorator={attending ? "In" : "Out"}
          slotProps={{
            endDecorator: {
              sx: {
                minWidth: 24,
              },
            },
          }}
        />
      </CardContent>
    </Card>
  );
}

export default Player;
