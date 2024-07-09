using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace awqaf.Domain
{
    [Table("frequently_asked_questions")]
    public class FrequentlyAskedQuestions : BaseEntity<long>
    {
        [Required]
        public string QuestionInEnglish { get; set; }
        [Required]
        public string QuestionInArabic { get; set; }
        [Required]
        public string AnswerInEnglish { get; set; }
        [Required]
        public string AnswerInArabic { get; set; }
        public string AddedBy { get; set; }
        public DateTime? CreationDate { get; set; }


        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var frequentlyAskedQuestions = obj as FrequentlyAskedQuestions;
            if (frequentlyAskedQuestions?.Id == null || frequentlyAskedQuestions?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, frequentlyAskedQuestions.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "FrequentlyAskedQuestions{" +
                    $"ID='{Id}'" +
                    $", QuestionInEnglish='{QuestionInEnglish}'" +
                    $", QuestionInArabic='{QuestionInArabic}'" +
                    $", AnswerInEnglish='{AnswerInEnglish}'" +
                    $", AnswerInArabic='{AnswerInArabic}'" +
                    $", AddedBy='{AddedBy}'" +
                    $", CreationDate='{CreationDate}'" +
                    "}";
        }
    }
}
