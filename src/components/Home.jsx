import React, { useState } from "react";
import axios from "axios";

function Home() {
  const [checked, setChecked] = useState(true);
  const [text, setText] = useState("");
  const [err, setErr] = useState("");
  const [data, setData] = useState("");
  const [done, setDone] = useState(false);
  const [table, setTable] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!text) {
      setErr("Required !");
      return;
    }

    const respond = await axios.post("/", { tagger: text, checked: checked });
    console.log(respond);
    // reset
    setErr("");
    setChecked(true);
    setText("");
    count = 1;
    setDone(false);
    // get data
    setData(respond.data);
    const temp = Result(respond.data);
    setTable(temp);
    const tic = setTimeout(() => {
      setDone(true);
      console.log(1);
      clearTimeout(tic);
    }, 2000);
  };

  const translate = (tag) => {
    if (tag === "N")
      return `Danh từ chung \n
      (cây, nước, đồ đạc, chim chóc, ...)`;
    else if (tag === "Np")
      return `Danh từ riêng (Nguyễn Du, Hải Phòng,
    Mộc tinh, Đạo Phật, ...)`;
    else if (tag === "Nc") return `Danh từ chỉ loại (con, cái, đứa, bức, ...)`;
    else if (tag === "Nu")
      return `Danh từ đơn vị (mét, cân, giờ, nắm, nhúm, hào, xu,
    đồng, ...)`;
    else if (tag === "V")
      return `Động từ (ngủ, ngồi, cười; đọc, viết, đá, đặt, thích, yêu, ghét, giống, muốn, ...)`;
    else if (tag === "A")
      return `Tính từ (tốt, xấu, đẹp; cao, thấp, rộng, ...)`;
    else if (tag === "P")
      return `Đại từ (tôi, chúng tôi, hắn, nó, y, đại nhân, đại
    ca, huynh, đệ, ...)`;
    else if (tag === "L")
      return `Định từ (mỗi, từng, mọi, cái; các, những, mấy, ...)`;
    else if (tag === "M")
      return `Số từ (một, mười, mười ba; dăm, vài, mươi;
      nửa, rưỡi, ...)`;
    else if (tag === "R")
      return `Phó từ (đã, sẽ, đang, vừa, mới, từng, xong,
      rồi; rất, hơi, khí, quá
      , ...)`;
    else if (tag === "E")
      return `Giới từ (trên, dưới, trong, ngoài; của, trừ,
      ngoài, khỏi, ở, ...)`;
    else if (tag === "C")
      return `Liên từ (và, với, cùng, vì vậy, tuy nhiên, ngược lại, ...)`;
    else if (tag === "I") return `Thán từ (ôi, chao, a ha, ...)`;
    else if (tag === "T")
      return `Trợ từ, tình thái từ (à, a, á, ạ, ấy, chắc, chăng, cho, chứ, ...)`;
    else if (tag === "B")
      return `Từ tiếng nước ngoài, từ mượn (Internet, email, video, chat, ...)`;
    else if (tag === "Y") return `Từ viết tắt (OPEC, WTO, HIV, ...)`;
    else if (tag === "S") return `Yếu tố cấu tạo từ (bất, vô, gia, đa, ...)`;
    else if (tag === "X") return `Các từ không phân loại được`;
  };

  let count = 1;
  const Result = (data) => {
    const arr = data["tagger"].trim().split(" ");

    let temp = [];
    for (let index = 0; index < arr.length; index++) {
      temp.push(arr[index].split("/"));
    }

    const final = temp.map((item) => {
      return (
        <tr key={count}>
          <th scope="row">{count++}</th>
          <td> {item[0]} </td>
          <td> {item[1]} </td>
          <td> {translate(item[1])} </td>
        </tr>
      );
    });

    return final;
  };

  return (
    <div className="row">
      <div className="col-6 " style={{ borderRight: "0px solid gray" }}>
        <div
          className="text-center h5"
          style={{
            paddingBottom: "20vh",
          }}
        >
          Tagger
        </div>
        <form
          onSubmit={onSubmit}
          style={{
            paddingBottom: "40vh",
          }}
        >
          <div className="form-group">
            <label htmlFor="texttotag">Vietnamese text</label>
            {"\u00A0"}
            {err ? <span className="text-danger">{err}</span> : ""}
            <input
              type="text"
              className="form-control"
              id="texttotag"
              placeholder="vd: Hôm nay ăn gì?"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              checked={checked}
              className="form-check-input"
              id="checkhistory"
              onChange={(e) => {
                setChecked(!checked);
              }}
            />
            <label className="form-check-label" htmlFor="checkhistory">
              Check history
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Tag
          </button>
        </form>
      </div>
      <div className="col-6 mb-3" style={{ borderLeft: "1px solid gray" }}>
        <div className="text-center h5 mb-5">Result</div>
        <table className="table table-borderless">
          <thead className="bg-light">
            <tr>
              <th scope="col" className="border-right border-white">
                Number
              </th>
              <th scope="col" className="border-right border-white">
                Word
              </th>
              <th scope="col" className="border-right border-white">
                Tag
              </th>
              <th scope="col" className="border-right border-white">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              done ? (
                table
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    <span className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </span>
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <th scope="row">1</th>
                <td>...</td>
                <td>...</td>
                <td>...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
