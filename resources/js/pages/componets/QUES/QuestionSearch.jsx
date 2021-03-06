import React, { useState, useEffect, useMemo } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@material-ui/core';
import QuestionList from './QuestionList';


export default function QuestionSearch() {
    // const initialState = {
    //     questionss: [
    //         {
    //             id: 1,
    //             title: '最初のタスク',
    //             category: 1,
    //             question: '子供が泣いてどうしよう'
    //         }, {
    //             id: 2,
    //             title: '2番目のタスク',
    //             category: 2,
    //             question: '高齢者が急に嘔吐してどうしよう'
    //         }, {
    //             id: 3,
    //             title: '3番目のタスク',
    //             category: 1,
    //             question: '子供が４０度の熱を出してしまって。。。どうすれば良いでしょうか'
    //         }
    //     ],
    //     categories: [
    //         {
    //             id: 1,
    //             title: 'カテゴリー1'
    //         }, {
    //             id: 2,
    //             title: 'カテゴリー2'
    //         }
    //     ]
    // };
    // // タスク
    // const [questionss, setquestionss] = useState(initialState.questionss);
    // カテゴリー
    const [categories, setCategories] = useState([]);
    // 検索条件
    const [filterQuery, setFilterQuery] = useState({});
    // ソート条件
    const [sort, setSort] = useState({});
    //DBからとってきた質問
    const [questions, setQuestions] = useState([]);

    const [values, setValues] = React.useState({
        amount: '',
    });

    useEffect(() => {
      getQuestionsData();
      getCategoriesData();
    },[])
  
    //一覧情報を取得しステートquestionsにセットする
    const getQuestionsData = () => {
      axios
          .get('/api/questions')
          .then(response => {
              setQuestions(response.data);
              console.log(response.data);
          })
          .catch(() => {
              console.log('通信に失敗しました');
          });
    }
    const getCategoriesData = () => {
      axios
          .get('/api/categories')
          .then(response => {
              setCategories(response.data);
          })
          .catch(() => {
              console.log('通信に失敗しました');
          });
    }

    const filteredTask = useMemo(() => {
        let tmpTasks = tasks;

        // 入力した文字は小文字にする
        const filterTitle = filterQuery.title && filterQuery.title.toLowerCase();
        const filterQuestion = filterQuery.question && filterQuery.question.toLowerCase();

        // 絞り込み検索
        tmpQuestions = tmpQuestions.filter(row => {

            // タイトルで絞り込み
            if (
                filterQuery.title &&
                String(row.title).toLowerCase().indexOf(filterTitle) === -1
            ) {
                return false;
            }
            // 質問内容で絞り込み
            if (
                filterQuery.question &&
                String(row.question).toLowerCase().indexOf(filterQuestion) === -1
            ) {
                return false;
            }
            // カテゴリーで絞り込み
            if (
                filterQuery.category_id &&
                row.category !== parseInt(filterQuery.category_id)
            ) {
                return false;
            }
            return row;
        });

        // ソート
        if (sort.key) {
            tmpQuestions = tmpQuestions.sort((a, b) => {
                a = a[sort.key];
                b = b[sort.key];
                return (a === b ? 0 : a > b ? 1 : -1) * sort.order;
            });
        }

        return tmpQuestions;
    }, [filterQuery, sort, questions]);
    // 入力した情報をfilterQueryに入れる
    const handleFilter = e => {
        const { name, value } = e.target;
        setFilterQuery({ ...filterQuery, [name]: value });
    };

    // 選択したカラムをSortに入れる
    const handleSort = column => {
        if (sort.key === column) {
            setSort({ ...sort, order: -sort.order });
        } else {
            setSort({
                key: column,
                order: 1
            })
        }
    };
    return (
        <div className="wrap">
            <div className="filter-box">
                <FormControl sx={{ m: 1, minWidth: 240 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">検索ワード</InputLabel>

                    <OutlinedInput
                        id="outlined-adornment-amount"
                        placeholder="質問内容"
                        value={filterQuery.title || ''}
                        onChange={handleFilter}
                        name="title"
                    />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 240 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">検索ワード</InputLabel>

                    <OutlinedInput
                        id="outlined-adornment"
                        placeholder="質問内容"
                        value={filterQuery.question || ''}
                        onChange={handleFilter}
                        name="question"
                    />
                </FormControl>
                <div className="input-group">
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 240 }}>
                        <InputLabel id="demo-simple-select-filled-label">カテゴリー選択</InputLabel>
                        <Select
                            name="category_id"
                            value={filterQuery.category_id}
                            onChange={handleFilter}
                        >

                            {
                                categories.map((category) => {
                                    return (
                                        <MenuItem
                                            key={category.id}
                                            value={category.id}>
                                            {category.category}
                                        </MenuItem>
                                    );
                                })
                            }
                        </Select>
                    </FormControl>
                </div>
            </div>

            <table>
                {/* <thead>
                    <tr>
                        <th onClick={() => handleSort('id')}>ID</th>
                        <th>タイトル</th>
                        <th onClick={() => handleSort('category')}>カテゴリー</th>
                    </tr>
                </thead> */}
                <tbody>
                    {
                        questions.map((questions) => {
                            return (
                                <tr key={questions.id}>
                                    <td>
                                        <QuestionList question ={questions} />
                                    </td>
                                </tr>
                            );
                        })
                    //     filteredQuestion.map((questions) => {
                    //         return (
                    //             <tr key={questions.id}>
                    //                 <td>
                    //                     <QuestionList Category_id ={questions.category}  Title = {questions.title} Question={questions.question} />
                    //                 </td>
                    //             </tr>
                    //          );
                    //      })
                     }
                </tbody>
            </table>

        </div>
    );
}