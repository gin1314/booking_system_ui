import PropTypes from 'prop-types';
import { format } from 'date-fns';
import numeral from 'numeral';
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet
} from '@react-pdf/renderer';
import MomentAdapter from '@date-io/moment';

const moment = new MomentAdapter();

const joinAddress = (arr) => arr.join(', ');

const COL1_WIDTH = 60;
const COLN_WIDTH = (100 - COL1_WIDTH) / 2;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 24
  },
  h4: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.235
  },
  h6: {
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 1.6
  },
  subtitle2: {
    fontSize: 10,
    fontWeight: 500,
    lineHeight: 1.57
  },
  body2: {
    fontSize: 10,
    lineHeight: 1.43
  },
  gutterBottom: {
    marginBottom: 4
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  brand: {
    height: 32,
    width: 32
  },
  company: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32
  },
  references: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32
  },
  billing: {
    marginTop: 32
  },
  items: {
    marginTop: 32
  },
  notes: {
    marginTop: 32
  },
  table: {
    display: 'flex',
    width: 'auto'
  },
  tableHeader: {},
  tableBody: {},
  tableRow: {
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
    borderStyle: 'solid',
    flexDirection: 'row'
  },
  tableCell1: {
    padding: 6,
    width: `${COL1_WIDTH}%`
  },
  tableCellN: {
    padding: 6,
    width: `${COLN_WIDTH}%`
  },
  alignRight: {
    textAlign: 'right'
  },
  alignLeft: {
    textAlign: 'left'
  }
});

const BookingPDF = (props) => {
  const { booking } = props;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Image source="/static/jbs_logo.jpg" style={styles.brand} />
            <Text style={styles.h6}>jbs-landsurveying.com</Text>
          </View>
          <View>
            <Text style={styles.h4}>{booking.status}</Text>
            <Text style={styles.subtitle2}>Booking Ref No. #{String(booking.id).padStart(12, '0')}</Text>
          </View>
        </View>
        <View style={styles.company}>
          <View>
            <Text style={styles.body2}>Unit H, 2/F F&P Bldg</Text>
            <Text style={styles.body2}>29 Gen. Luna St.</Text>
            <Text style={styles.body2}>Tuktukan, Taguig City</Text>
          </View>
        </View>
        {/* <View style={styles.references}>
          <View>
            <Text style={[styles.subtitle2, styles.gutterBottom]}>
              Due Date
            </Text>
            <Text style={styles.body2}>
              {format(invoice.dueDate, 'dd MMM yyyy')}
            </Text>
          </View>
          <View>
            <Text style={[styles.subtitle2, styles.gutterBottom]}>
              Date of issue
            </Text>
            <Text style={styles.body2}>
              {format(invoice.issueDate, 'dd MMM yyyy')}
            </Text>
          </View>
          <View>
            <Text style={[styles.subtitle2, styles.gutterBottom]}>
              Number
            </Text>
            <Text style={styles.body2}>
              {invoice.number}
            </Text>
          </View>
        </View> */}
        <View style={styles.billing}>
          <Text style={[styles.subtitle2, styles.gutterBottom]}>Booked by</Text>
          <Text style={styles.body2}>
            {`${booking.first_name} ${booking.last_name}`}
          </Text>
          <Text style={styles.body2}>{`Phone no.: ${booking.phone_no}`}</Text>
          <Text style={styles.body2}>{`Email address.: ${booking.email}`}</Text>
          <Text style={styles.body2}>
            {`Address: ${booking.client_street}, ${booking.client_city}, ${booking.client_region}`}
          </Text>
        </View>
        <View style={styles.items}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              {/* <View style={styles.tableRow}>
                <View style={styles.tableCell1}>
                  <Text style={styles.h6}>Information</Text>
                </View>
                <View style={styles.tableCellN} />
                <View style={styles.tableCellN} />
              </View> */}
            </View>
            <View style={styles.tableBody}>
              {/* {invoice.items.map((item) => ( */}
              <View style={styles.tableRow}>
                <View style={styles.tableCell1}>
                  <Text style={styles.body2}>Survey Date</Text>
                </View>
                <View style={styles.tableCellN}>
                  <Text style={styles.body2}>
                    {moment
                      .date(booking.schedule_date)
                      .format('MMMM D, YYYY')}
                  </Text>
                </View>
                <View style={styles.tableCellN} />
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell1}>
                  <Text style={styles.body2}>Time</Text>
                </View>
                <View style={styles.tableCellN}>
                  <Text style={styles.body2}>
                    {booking.time_slot_word}
                  </Text>
                </View>
                <View style={styles.tableCellN} />
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell1}>
                  <Text style={styles.body2}>Name</Text>
                </View>
                <View style={styles.tableCellN}>
                  <Text style={styles.body2}>
                    {`${booking.first_name} ${booking.last_name}`}
                  </Text>
                </View>
                <View style={styles.tableCellN} />
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell1}>
                  <Text style={styles.body2}>Address</Text>
                </View>
                <View style={styles.tableCellN}>
                  <Text style={styles.body2}>
                    {joinAddress([
                      booking.client_street,
                      booking.client_city,
                      booking.client_region,
                      booking.client_postal_code
                    ])}
                  </Text>
                </View>
                <View style={styles.tableCellN} />
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell1}>
                  <Text style={styles.body2}>Phone no.</Text>
                </View>
                <View style={styles.tableCellN}>
                  <Text style={styles.body2}>
                    {booking.phone_no}
                  </Text>
                </View>
                <View style={styles.tableCellN} />
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell1}>
                  <Text style={styles.body2}>Survey type</Text>
                </View>
                <View style={styles.tableCellN}>
                  <Text style={styles.body2}>
                    {booking.survey_type_word}
                  </Text>
                </View>
                <View style={styles.tableCellN} />
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell1}>
                  <Text style={styles.body2}>Land location</Text>
                </View>
                <View style={styles.tableCellN}>
                  <Text style={styles.body2}>
                    {joinAddress([
                      booking.land_street,
                      booking.land_city,
                      booking.land_region,
                      booking.land_postal_code
                    ])}
                  </Text>
                </View>
                <View style={styles.tableCellN} />
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell1}>
                  <Text style={styles.body2}>Appointment notes</Text>
                </View>
                <View style={styles.tableCellN}>
                  <Text style={styles.body2}>
                    {booking.appointment_notes}
                  </Text>
                </View>
                <View style={styles.tableCellN} />
              </View>
              {/* ))} */}
              {/* <View style={styles.tableRow}>
                <View style={styles.tableCell1} />
                <View style={styles.tableCellN}>
                  <Text style={styles.body2}>Subtotal</Text>
                </View>
                <View style={styles.tableCellN}>
                  <Text style={styles.body2}>
                    {numeral(invoice.subtotalAmount).format(
                      `${invoice.currency}0,0.00`
                    )}
                  </Text>
                </View>
              </View> */}
              {/* <View style={styles.tableRow}>
                <View style={styles.tableCell1} />
                <View style={styles.tableCellN}>
                  <Text style={styles.body2}>Taxes</Text>
                </View>
                <View style={styles.tableCellN}>
                  <Text style={[styles.body2, styles.alignRight]}>
                    {numeral(invoice.taxAmount).format(
                      `${invoice.currency}0,0.00`
                    )}
                  </Text>
                </View>
              </View> */}
              {/* <View style={styles.tableRow}>
                <View style={styles.tableCell1} />
                <View style={styles.tableCellN}>
                  <Text style={styles.body2}>Total</Text>
                </View>
                <View style={styles.tableCellN}>
                  <Text style={[styles.body2, styles.alignRight]}>
                    {numeral(invoice.totalAmount).format(
                      `${invoice.currency}0,0.00`
                    )}
                  </Text>
                </View>
              </View> */}
            </View>
          </View>
        </View>
        {/* <View style={styles.notes}>
          <Text style={[styles.h6, styles.gutterBottom]}>Notes</Text>
          <Text style={styles.body2}>
            Please make sure you have the right bank registration number as I
            had issues before and make sure you guys cover transfer expenses.
          </Text>
        </View> */}
      </Page>
    </Document>
  );
};

BookingPDF.propTypes = {
  booking: PropTypes.object.isRequired
};

export default BookingPDF;
