import * as React from 'react';
import { Grid } from '@material-ui/core'
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';

function CreateQuestion2(props) {

  const { formData, inputChange } = props;

    return (
        <Grid container>
            <Grid sm={2} />
            <Grid lg={8} sm={8} spacing={10}>
                <TextField
                    name="title"
                    label="タイトル"
                    fullWidth
                    margin="normal"
                    value={formData.title}
                    placeholder="【至急】〇〇〇..."
                    onChange={inputChange}
                />
{/* TODO/音声認識ソフトを追加 */}
                <Tooltip
                    title="自由に記入することができます"
                    placement="top-start"
                    arrow
                >
                    <TextField
                        name="content"
                        label="詳細"
                        fullWidth
                        margin="normal"
                        rows={8}
                        multiline
                        variant="outlined"
                        value={formData.content}
                        onChange={inputChange}
                        placeholder="
                                    - 聞きたいこと（質問の概要）&#13;
                                    - 目的（それを聞いてあなたは何がしたいのか）&#13;
                                    - 状況（あなたが今どのような状況で、なぜ悩んでいるのか）&#13;
                                    - 何でどこまで調べて何がわかったか（自分でやった事）&#13;
                                    - あなたの考え（自分としてはどうするべきと判断しているのか）&#13;
                                    ※ご自由に記載ください"
                    />
                </Tooltip>
            </Grid>
        </Grid>
    )
}

export default CreateQuestion2