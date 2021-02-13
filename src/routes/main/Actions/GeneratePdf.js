
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from 'moment';
import LineItemService from '../../../service/LineItemService';
import ItemService from '../../../service/ItemService';
import * as urlConfig from '../../../constants/URLConstant';


const formatData = async (data, items) => {
  return data.map((item, i) => {
    let customerName = ''
    if (items && items.length > 0) {
      let product = items.filter(prod => prod.id === item.item_id)
      if (product.length > 0) customerName = product[0].name
    }
    return {
      ...item,
      item_name: customerName
    };
  });

}

const formatDate = async (data) => {
  return data.map((item, i) => {
    
    return {
      ...item,
      bid_date1:  moment(item.bid_date).format('DD/MM/YYYY')
    };
  });

}

export const GeneratePDF = async (data, isBulk) => {
  const doc = new jsPDF();
  let res
  let items
 
  if (isBulk) {
    data = await formatDate(data)
    doc.setTextColor("5fa30f");
    doc.text(25, 15, "Bid Details");
    doc.autoTable({
      theme: 'grid',
      startX: 50,
      startY: 25,
      styles: { overflow: 'linebreak', cellWidth: 'auto' },
      columnStyles: { text: { cellWidth: 'auto', textColor: 2 } },
      columns: [
        { header: 'Customer', dataKey: 'customer' },
        { header: 'Date', dataKey: 'bid_date1' },
        { header: 'Total sqft', dataKey: 'total_sqft' },
        { header: 'Bid total', dataKey: 'bid_total' },
        { header: 'Terms', dataKey: 'terms' },
        { header: 'Tax', dataKey: 'tax' },
        { header: 'Grand total', dataKey: 'grand_total' },
      ],
      body: data
    })

  } else {
    res = await LineItemService.GetLineItemsByBidID(data.id);

    if (res.status === urlConfig.SUCCESS_CODE) {
      res = res.data
      data.bid_date = moment(data.bid_date).format('DD/MM/YYYY')
      items = await ItemService.GetItems();

      if (items.status === urlConfig.SUCCESS_CODE) {
        res = await formatData(res, items.data)
      } else {
        return false
      }

    } else {
      return false
    }
    doc.setTextColor("5fa30f");
    doc.text(25, 15, "Bid Details");

    var rows = [
      ['Customer : ', ` ${data.customer}`,],
      ['Date : ', ` ${data.bid_date}`,],
      ['Total sqft :  ', ` ${data.total_sqft}`,],
      ['Bid total : ', ` ${data.bid_total}`,],
      ['Terms : ', ` ${data.terms}`,],
      ['Tax: ', ` ${data.tax}`,],
      ['Grand total : ', ` ${data.grand_total}`,],
    ];
    doc.autoTable({
      theme: 'plain',
      startY: 35,
      styles: { overflow: 'linebreak', cellWidth: 50, fontSize: 12, },
      columnStyles: { text: 12, },
      body: rows
    })
    doc.autoTable({
      theme: 'grid',
      startX: 50,
      startY: 110,
      styles: { overflow: 'linebreak', cellWidth: 'auto' },
      columnStyles: { text: { cellWidth: 'auto', textColor: 2 } },
      columns: [
        { header: 'Line Item', dataKey: 'item_name' },
        { header: 'Line item sqft', dataKey: 'line_sqft' },
        { header: 'Line item price', dataKey: 'line_item_price' },
      ],
      body: res
    })
  }


  let date = moment(new Date).format("DD/MM/YYYY")
  doc.save(`${'Test'}_${date}.pdf`);
};
