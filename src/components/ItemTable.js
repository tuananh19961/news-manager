import React from 'react';
class ItemTable extends React.Component {
  render() {
    return (
      	<tr>
      		<td>      	
             <a data-fancybox="gallery" href="../img/Flat-bench.jpg">
              <img src="../img/Flat-bench.jpg" alt="../img/Flat-bench.jpg" className="img-gym"/>
             </a>
      		</td>
      		<td>Long-Arm Crunch</td>
      		<td>1. Bạn vào tư thế nằm ngửa, hai đầu gối co lên, duỗi hai tay thẳng.
				2. Bạn di chuyển hai cánh tay thẳng qua đầu, khép lại để cạnh nhau.
				3. Kế đến, bạn gập người bằng cách từ từ nâng cả đầu và cánh tay lên nhưng không quá cao, rồi hạ người về vị trí cũ.
			</td>
      		<td>ABSBeginer</td>
      		<td>12 lần</td>
      	</tr>
    );
  }
}

export default ItemTable