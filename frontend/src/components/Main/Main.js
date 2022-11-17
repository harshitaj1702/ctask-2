/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import RemoveIcon from "@mui/icons-material/Remove";
import { ReactComponent as Time } from "../icons/time.svg";
import { ReactComponent as TimeDark } from "../icons/darktime.svg";
import { ReactComponent as Db } from "../icons/db.svg";
import { ReactComponent as DbDark } from "../icons/darkdb.svg";
import { getData } from "../../services/ServerServices";
import { Checkbox, FormControlLabel } from "@mui/material";

export default function Main() {
  const color = useSelector((state) => state.color);
  const theme = useSelector((state) => state.theme);
  const [data, setData] = useState({});
  const [selected, setSelected] = useState([]);

  const fetchData = async () => {
    const result = await getData("");
    if (result.status) {
      setData(result.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckBox = (status, id, len = 0, key = "") => {
    console.log(status, id);
    if (id != "all") {
      if (status) {
        const values = [...selected];
        values.push(id);
        console.log(values);
        setSelected(values);
      } else {
        const values = [...selected];
        const index = values.indexOf(id);
        values.splice(index, 1);
        console.log(values);
        setSelected(values);
      }
    } else {
      if (status) {
        const values = [];
        for (let i = 0; i < len; i++) {
          values.push(key + "-" + i);
        }
        setSelected(values);
      } else {
        setSelected([]);
      }
    }
  };

  return (
    <div>
      <Accordion
        style={{
          backgroundColor: color,
          color: theme == "light" ? "black" : "white",
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          expandIcon={
            <RemoveIcon
              style={{ color: theme == "light" ? "black" : "white" }}
            />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>SPACE DATA</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Accordion
            style={{
              backgroundColor: color,
              color: theme == "light" ? "black" : "white",
              boxShadow: "none",
            }}
          >
            <AccordionSummary
              expandIcon={
                <RemoveIcon
                  style={{ color: theme == "light" ? "black" : "white" }}
                />
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{
                backgroundColor: theme == "light" ? "#F1F5FD" : "#676AD8",
                borderRadius: 15,
              }}
            >
              <Typography style={{ display: "flex" }}>
                {theme == "dark" ? <TimeDark /> : <Time />}Time
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {Object.keys(data).map((item) => (
                <Accordion
                  style={{
                    backgroundColor: color,
                    color: theme == "light" ? "black" : "white",
                    boxShadow: "none",
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <RemoveIcon
                        style={{ color: theme == "light" ? "black" : "white" }}
                      />
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography style={{ display: "flex" }}>
                      {theme == "dark" ? (
                        <DbDark style={{ marginRight: 5 }} />
                      ) : (
                        <Db style={{ marginRight: 5 }} />
                      )}
                      {item}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ textAlign: "left" }}>
                    <FormControlLabel
                      label="Select All"
                      control={
                        <Checkbox
                          checked={data[item].length == selected.length}
                          onChange={(e) =>
                            handleCheckBox(
                              e.target.checked,
                              "all",
                              data[item].length,
                              item
                            )
                          }
                          inputProps={{ "aria-label": "controlled" }}
                          style={{
                            color: theme == "light" ? "#4C51B9" : "white",
                          }}
                        />
                      }
                    />
                    {data[item].map((itm, index) => {
                      const checked =
                        selected.indexOf(item + "-" + index) != -1
                          ? true
                          : false;
                      return (
                        <Typography>
                          <FormControlLabel
                            label={`${itm.name} (${itm.size})`}
                            control={
                              <Checkbox
                                checked={checked}
                                onChange={(e) =>
                                  handleCheckBox(
                                    e.target.checked,
                                    item + "-" + index
                                  )
                                }
                                inputProps={{ "aria-label": "controlled" }}
                                style={{
                                  color: theme == "light" ? "#4C51B9" : "white",
                                }}
                              />
                            }
                          />
                        </Typography>
                      );
                    })}
                  </AccordionDetails>
                </Accordion>
              ))}
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
