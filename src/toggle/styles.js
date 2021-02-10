import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    .toggle-btn {
        height: 22px;
        min-width: 32px;
        background: lightgray;
        box-shadow: 0px 2px 8px 0px rgba(154,173,194,0.16);
        border: 2px solid white;
        border-radius: 30px;
        display: flex;
        justify-content: flex-start;
        align-item: center;
        padding: 2px 0 5px;
        cursor: pointer;
    }

    .toggle-btn > .inner-circle {
        width: 14px;
        height: 14px;
        background: white;
        box-shadow: 0px 2px 8px 0px rgba(154,173,194,0.16);
        border-radius: 50%;
        -webkit-transition: all 0.1s ease-in;
        -moz-transition: all 0.1s ease-in;
        -o-transition: all 0.1s ease-in;
        -ms-transition: all 0.1s ease-in;
    }

    .toggle-btn.active {
        background: linear-gradient(gray, blue);
        -webkit-transition: all 0.1s ease-in;
        -moz-transition: all 0.1s ease-in;
        -o-transition: all 0.1s ease-in;
        -ms-transition: all 0.1s ease-in;
    }

    
    .toggle-btn.active > .inner-circle {
        margin-left: 17px;
        -webkit-transition: all 0.1s ease-in;
        -moz-transition: all 0.1s ease-in;
        -o-transition: all 0.1s ease-in;
        -ms-transition: all 0.1s ease-in;
    }

`
