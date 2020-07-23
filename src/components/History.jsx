import React, { useEffect, useState } from "react";
import axios from "axios";
import { PopoverHeader, UncontrolledPopover } from "reactstrap";

function History() {
  const [data, setdata] = useState(false);
  useEffect(() => {
    const exec = async () => {
      const respond = await axios.get(
        "https://pos-tagger-cs338-k21.herokuapp.com/"
      );
      console.log(respond.data);
      setdata(respond.data);
    };
    exec();
  }, []);

  let count = 0;

  const Copy = (id) => {
    /* Get the text field */
    var copyText = document.getElementById(id);
    window.navigator.clipboard.writeText(copyText.innerText);
  };

  const translate = (tag) => {
    if (tag === "N")
      return `Danh từ chung (cây, nước, đồ đạc,
     chim chóc, ...)`;
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
  const Result = (data) => {
    const arr = data.trim().split(" ");

    let temp = [];
    for (let index = 0; index < arr.length; index++) {
      temp.push(arr[index].split("/"));
    }
    let count = 0;
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
    <div className="accordion" id="accordion">
      {data ? (
        data.map((item) => {
          const rand = Math.floor(Math.random() * 10);
          return (
            <div className="card" key={count++}>
              <div
                className="card-header"
                id={item.id}
                style={{ padding: ".5em" }}
              >
                <h2 className="mb-0 d-flex">
                  <button
                    className="btn btn-link btn-block text-left collapsed text-center "
                    type="button"
                    data-toggle="collapse"
                    data-target={"#collapse" + count}
                    aria-controls={"collapse" + count}
                    style={{ boxShadow: "none", padding: "0" }}
                  >
                    <span className="h3" id={item.id + "copy"}>
                      {item.origin}
                    </span>
                  </button>
                  <div className="d-flex mr-3">
                    <button
                      className="btn btn-success mr-2"
                      type="button"
                      id={"popover" + count * 14}
                      onClick={() => {
                        Copy(item.id + "copy");
                      }}
                    >
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        className="bi bi-files"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3z"
                        />
                        <path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2z" />
                      </svg>
                    </button>
                    <UncontrolledPopover
                      trigger="focus"
                      placement="top"
                      target={"popover" + count * 14}
                    >
                      <PopoverHeader>Copied !</PopoverHeader>
                    </UncontrolledPopover>
                    <button className="btn btn-danger ">
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        className="bi bi-trash-fill "
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          setdata(
                            data.filter((_item) => {
                              return item.id !== _item.id;
                            })
                          );
                          axios.delete("/" + item.id);
                        }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
                        />
                      </svg>
                    </button>
                  </div>
                </h2>
              </div>
              <div
                id={"collapse" + count}
                className="collapse"
                aria-labelledby={item.id}
                data-parent="#accordion"
              >
                <div className="card-body">
                  <table className="table table-sm table-borderless">
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
                    <tbody>{Result(item.tagger)}</tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center">
          <span className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </span>
        </div>
      )}
    </div>
  );
}

export default History;
