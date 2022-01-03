export const paymentTemplate = (data: any): string => {
    return `<html><head><title>PolBol Paytm Portal</title></head><body><form action="${data.final_url}" method="POST" name="f1">${data.formFields}</form><script type="text/javascript">document.f1.submit()</script></body></html>`
}

export const responseTemplate = (data: any): string => {
    return `<html>
    <head>
        <title>Merchant Check Out Page</title>
        <style>
            body {
                height:90vh;
                width:90vw;
                background-color: #ECEFF1;
                font-family: Helvetica;
            }
            .receipt {
                width: 400px;
                background-color: transparent;
                margin: 80px auto 80px auto;
            }
            .table-receipt {
                border-radius: 10px;
                border-bottom-left-radius: 0px;
                border-bottom-right-radius: 0px;
                width: 100%;
                border-collapse: collapse;
                box-shadow: -20px 30px 50px 0px #8d8d8d;
                background-color: white;
            }
            .th-header {
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
                width: 100%;
                background-color: #3a903e;
                color: white;
                padding: 24px;
                font-size: 24px;
            }
            .td-title {
                font-size: 16px;
                font-weight: 700;
                color: #78909c;
                padding: 12px 8px 12px 8px;
                border-bottom: 1px solid #CFD8DC;
            }
            .td-content {
                font-size: 18px;
                text-align: right;
                padding: 12px 8px 12px 8px;
                border-bottom: 1px solid #CFD8DC;
            }
            .td-bottom {
                width: 100%;
                font-weight: 600;
                color: #3a903e;
                text-align: center;
                padding: 24px;
                font-size: 20px;
            }
        </style>
    </head>
    <body>
    <div class="receipt">
        <table class="table-receipt">
            <thead>
            <tr>
                <th class="th-header"
                    colspan="2">PAYMENT RECEIPT
                </th>
            </tr>
            </thead>
            <tbody>
            ${data}
            <tr>
                <td class="td-bottom"
                    colspan="2">Thank you!.
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    
    </body>
    </html>`
}