import styled from "styled-components"

export const MonthMenu = () => {
  return <MonthContentLayout>
    <div className="date">September 2023</div>
    <ul className="week-days-box">
      <li className="week-day">S</li>
      <li className="week-day">M</li>
      <li className="week-day">T</li>
      <li className="week-day">W</li>
      <li className="week-day">T</li>
      <li className="week-day">F</li>
      <li className="week-day">S</li>
    </ul>
    <DaysBox $daysShift={0}>
      <div className="days-shift" />
      <div className="day ">1</div>
      <div className="day">2</div>
      <div className="day">3</div>
      <div className="day">3</div>
      <div className="day active">3</div>
      <div className="day">3</div>
      <div className="day">3</div>
      <div className="day">3</div>
      <div className="day">3</div>
      <div className="day">3</div>
      <div className="day">3</div>
    </DaysBox>

  </MonthContentLayout>
}

const MonthContentLayout = styled.div`

  flex: 0 0 320px;
  padding: 0 20px;

  scroll-snap-stop: always;
  scroll-snap-align: center;

  .week-days-box {
    gap: 7px;

    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    justify-items: center;
    margin-bottom: 5px;

    .week-day {
      color: var(--txt-6);
      font-family: Inter;
      font-size: 11px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }

  .date {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    color: var(--txt-5);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }




`
const DaysBox = styled.div<{
  $daysShift?: number
}>`

  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
  row-gap: 5px;

  .days-shift {
    display: ${({ $daysShift }) => !$daysShift && "none"};
    grid-column: span ${({ $daysShift }) => $daysShift && $daysShift};
  }

  .day {
    color: var(--txt-5);
    font-family: Inter;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .active {
    background-color: rgb(63, 81, 181);
    color: var(--txt-1);
  }
`