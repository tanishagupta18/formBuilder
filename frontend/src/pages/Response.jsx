import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import styles from './Response.module.css'
import { useForm } from '../Contexts/FormContext';

const data = [
  {
    submittedAt: 'Jul 17, 03:23 PM',
    button1: 'Hi!',
    email1: 'abc@g.com',
    text1: 'alpha',
    button2: 'Studio App to Manage Clients, Tracking App for Clients',
    rating1: 5
  },
  {
    submittedAt: 'Jul 17, 02:48 PM',
    button1: 'Hi!',
    email1: '',
    text1: 'fsdfasd',
    button2: '',
    rating1: 3
  },
  {
    submittedAt: 'Jul 14, 04:25 PM',
    button1: 'Hi!',
    email1: '',
    text1: '',
    button2: '',
    rating1: 4
  }
];

const Response = () => {
  const {currentFormData} = useForm();
  const {responses,responseCount,content} = currentFormData;
  const inputElements = content.filter(element => element.type === 'input').length;
 
  const outputElements = responses.filter(response => response.responses[0] && Object.keys(response.responses[0]).length === inputElements).length;
  
  const completionRate = (outputElements*100)/responses.length;
  return (
    <div className={styles.app}>
      <div className={styles.stats}>
        <StatCard title="Views" value= {responseCount} />
        <StatCard title="Starts" value={responses.length} />
        <StatCard title="Completion rate" value={`${isNaN(completionRate) ? 0 : completionRate.toFixed(2)}%`} />
      </div>
      <DataTable />
    </div>
  );
};

export default Response;
