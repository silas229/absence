import React from 'react';
export default function AbsenceComponent(){
    return(
        <main>
        <div className="flex headline">
            <h1>Fehlzeiten</h1>
            <button>Neue Fehlzeit</button>
        </div>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
            clita kasd gubergren, no sea takimata sanctus est.</p>
        { <table>
            <thead>
                <tr>
                    <th className="date">Datum</th>
                    <th className="subject">Fach</th>
                    <th className="registered">eingetragen am</th>
                    <th className="approved">bestätigt</th>
                    <th className="reason">Grund</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="date">1. April 2018</td>
                    <td className="subject">Deutsch</td>
                    <td className="registered">1. April 2018</td>
                    <td className="approved">ja</td>
                    <td className="reason">-</td>
                </tr>
                <tr>
                    <td className="date">1. April 2018</td>
                    <td className="subject">Deutsch</td>
                    <td className="registered">1. April 2018</td>
                    <td className="approved">ja</td>
                    <td className="reason">-</td>
                </tr>
                <tr>
                    <td className="date">1. April 2018</td>
                    <td className="subject">Deutsch</td>
                    <td className="registered">1. April 2018</td>
                    <td className="approved">ja</td>
                    <td className="reason">-</td>
                </tr>
                <tr>
                    <td className="date">1. April 2018</td>
                    <td className="subject">Deutsch</td>
                    <td className="registered">1. April 2018</td>
                    <td className="approved">ja</td>
                    <td className="reason">-</td>
                </tr>
                <tr>
                    <td className="date">1. April 2018</td>
                    <td className="subject">Deutsch</td>
                    <td className="registered">1. April 2018</td>
                    <td className="approved">ja</td>
                    <td className="reason">-</td>
                </tr>
                <tr>
                    <td className="date">1. April 2018</td>
                    <td className="subject">Deutsch</td>
                    <td className="registered">1. April 2018</td>
                    <td className="approved">ja</td>
                    <td className="reason">-</td>
                </tr>
                <tr>
                    <td className="date">1. April 2018</td>
                    <td className="subject">Deutsch</td>
                    <td className="registered">1. April 2018</td>
                    <td className="approved">ja</td>
                    <td className="reason">-</td>
                </tr>
            </tbody>
        </table> }
    </main>)
}

