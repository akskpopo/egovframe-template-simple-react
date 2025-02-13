import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

import * as EgovNet from "api/egovFetch";
import URL from "constants/url";

function EgovMain(props) {
  console.group("EgovMain");
  console.log("[Start] EgovMain ------------------------------");
  console.log("EgovMain [props] : ", props);

  const location = useLocation();
  console.log("EgovMain [location] : ", location);

  // eslint-disable-next-line no-unused-vars
  const [noticeBoard, setNoticeBoard] = useState();
  // eslint-disable-next-line no-unused-vars
  const [gallaryBoard, setGallaryBoard] = useState();
  const [noticeListTag, setNoticeListTag] = useState();
  const [gallaryListTag, setGallaryListTag] = useState();

  const retrieveList = useCallback(() => {
    console.groupCollapsed("EgovMain.retrieveList()");

    const retrieveListURL = "/cmm/main/mainPageAPI.do";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(),
    };

    EgovNet.requestFetch(
      retrieveListURL,
      requestOptions,
      (resp) => {
        setNoticeBoard(resp.result.notiList);
        setGallaryBoard(resp.result.galList);

        let mutNotiListTag = [];
        mutNotiListTag.push(<li key="0">검색된 결과가 없습니다.</li>); // 게시판 목록 초기값

        // 리스트 항목 구성
        resp.result.notiList.forEach(function (item, index) {
          if (index === 0) mutNotiListTag = []; // 목록 초기화
          mutNotiListTag.push(
            <li key={item.nttId}>
              <Link
                to={{ pathname: URL.INFORM_NOTICE_DETAIL }}
                state={{
                  nttId: item.nttId,
                  bbsId: item.bbsId,
                }}
              >
                {item.nttSj}
                <span>{item.frstRegisterPnttm}</span>
              </Link>
            </li>
          );
        });
        setNoticeListTag(mutNotiListTag);

        let mutGallaryListTag = [];
        mutGallaryListTag.push(<li key="0">검색된 결과가 없습니다.</li>); // 게시판 목록 초기값

        // 리스트 항목 구성
        resp.result.galList.forEach(function (item, index) {
          if (index === 0) mutGallaryListTag = []; // 목록 초기화
          mutGallaryListTag.push(
            <li key={index}>
              <Link
                to={{ pathname: URL.INFORM_GALLERY_DETAIL }}
                state={{
                  nttId: item.nttId,
                  bbsId: item.bbsId,
                }}
              >
                {item.nttSj}
                <span>{item.frstRegisterPnttm}</span>
              </Link>
            </li>
          );
        });
        setGallaryListTag(mutGallaryListTag);
      },
      function (resp) {
        console.log("err response : ", resp);
      }
    );
    console.groupEnd("EgovMain.retrieveList()");
  }, []);

  const { naver } = window;

  useEffect(() => {
    retrieveList();
    const mapDiv = document.getElementById("map");

    const position = new naver.maps.LatLng(37.4794032, 126.8845991);
    const mapOptions = {
      center: position,
      zoom: 12,
      minZoom: 6,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };

    const map = new window.naver.maps.Map(mapDiv, mapOptions);

    const markerOptions = {
      position: position.destinationPoint(90, 15),
      map: map,
      icon: {
        url: "https://navermaps.github.io/maps.js/docs/img/example/ico_pin.jpg", //size: new naver.maps.Size(50, 52),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(25, 26),
      },
    };

    const marker = new naver.maps.Marker(markerOptions);

    console.log("네이버지도 로딩");
  }, [retrieveList]);

  console.log("------------------------------EgovMain [End]");
  console.groupEnd("EgovMain");

  return (
    <div className="container P_MAIN">
      <div className="c_wrap">
        <div className="colbox">
          <div className="left_col">
            {/* <img src="/assets/images/img_simple_main.png" alt="단순 홈페이지 전자정부 표준프레임워크의 경량환경 내부업무에 대한 최신 정보와 기술을 제공하고 있습니다." /> */}

            <div
              id="map"
              style={{
                width: "640px",
                height: "300px",
                //border: "solid",
                borderWidth: 5,
                borderRadius: 20,
                borderColor: "#369fff",
                //backgroundColor: "#369fff",
              }}
            ></div>
          </div>

          <div className="right_col">
            <div className="mini_board">
              <ul className="tab">
                <li>
                  <a href="#공지사항" className="on">
                    공지사항
                  </a>
                </li>
                <li>
                  <a href="#갤러리">갤러리</a>
                </li>
              </ul>
              <div className="list">
                <div className="notice">
                  <h2 className="blind">공지사항</h2>
                  <ul>{noticeListTag}</ul>
                  <Link to={URL.INFORM_NOTICE} className="more">
                    더보기
                  </Link>
                </div>

                <div className="gallary">
                  <h2 className="blind">갤러리</h2>
                  <ul>{gallaryListTag}</ul>
                  <Link to={URL.INFORM_GALLERY} className="more">
                    더보기
                  </Link>
                </div>
              </div>
            </div>

            <div className="banner">
              <Link to={URL.SUPPORT_DOWNLOAD} className="bn1">
                <strong>자료실</strong>
                <span>
                  다양한 자료를
                  <br />
                  다운로드 받으실 수 있습니다.
                </span>
              </Link>
              <Link to={URL.ABOUT} className="bn2">
                <strong>표준프레임워크센터</strong>
                <span>
                  표준프레임워크센터의
                  <br />
                  약도 등의 정보를 제공합니다.
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="banner_bot">
          <div className="b1">
            <div>
              <h2>유량측정</h2>
              <p>
                표준프레임워크가 제공하는
                <br />
                주요 사업을 소개합니다.
              </p>
            </div>
            <Link to={URL.INTRO_WORKS}>자세히 보기</Link>
          </div>
          <div className="b2">
            <div>
              <h2>장비</h2>
              <p>
                표준프레임워크 실행환경의
                <br />
                서비스 그룹에서 제공하는
                <br />
                대표서비스입니다.
              </p>
            </div>
            <Link to={URL.INTRO_SERVICE}>자세히 보기</Link>
          </div>
          <div className="b3">
            <div>
              <h2>위치</h2>
              <p>
                표준프레임워크 경량환경
                <br />
                홈페이지의 다양한 서비스를
                <br />
                신청 하실 수 있습니다.
              </p>
            </div>
            <Link to={URL.SUPPORT_APPLY}>자세히 보기</Link>
          </div>
          <div className="b4">
            <div>
              <h2>대시보드</h2>
              <p>
                표준프레임워크 경량환경
                <br />
                홈페이지의 전체적인 일정
                <br />
                현황을 조회하실 수 있습니다.
              </p>
            </div>
            <Link to={URL.INFORM}>자세히 보기</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EgovMain;
