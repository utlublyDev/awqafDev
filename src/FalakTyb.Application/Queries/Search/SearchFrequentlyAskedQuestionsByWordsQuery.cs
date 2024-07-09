using awqaf.Domain;
using awqaf.Dto;
using JHipsterNet.Core.Pagination;
using MediatR;
using System.Collections.Generic;

namespace awqaf.Application.Queries
{
    public class SearchFrequentlyAskedQuestionsByWordsQuery :  IRequest<IEnumerable<FrequentlyAskedQuestions>>
    {
        public IPageable Page { get; set; }
         public string Words { get; set; }

       
    }
}
